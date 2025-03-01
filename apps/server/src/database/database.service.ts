import { Injectable, Inject } from '@nestjs/common';
import { CreateTableDto } from 'src/dto/create-table.dto';
import { AlterTableDto } from 'src/dto/alter-table.dto';
import { ILogger, LOGGER } from 'src/core/pino.logger'; // Use the ILogger interface
import { BaseDatabaseAdapter } from './database.adapter';
import { DatabaseFactory, DatabaseType } from './database.factory';
import { CreateTableResponse, AlterTableResponse } from 'src/dto/response.dto';

@Injectable()
export class DatabaseService {
  private adapter: BaseDatabaseAdapter;

  constructor(@Inject(LOGGER) private readonly logger: ILogger) {
    this.adapter = DatabaseFactory.getAdapter(DatabaseType.POSTGRES);
  }

  async createTable(
    createTableDto: CreateTableDto
  ): Promise<CreateTableResponse> {
    this.logger.info(`Creating table: ${createTableDto.tableName}`);
    try {
      // Start a transaction
      await this.adapter.startTransaction();

      // Step 1: Create the table in the database
      await this.adapter.createTable(
        createTableDto.tableName,
        createTableDto.columns
      );

      // Step 2: Insert metadata into "TableDefinition"
      const tableId = await this.adapter.insertTableDefinition(
        createTableDto.tableName
      );

      // Step 3: Insert metadata into "FieldDefinition"
      for (const column of createTableDto.columns) {
        await this.adapter.insertFieldDefinition(tableId, column);
      }

      // Commit the transaction
      await this.adapter.commitTransaction();
      this.logger.info(
        `Successfully created table: ${createTableDto.tableName}`
      );

      // Return a structured response
      return {
        success: true,
        message: `Table "${createTableDto.tableName}" created successfully.`,
        tableId
      };
    } catch (error) {
      // Rollback the transaction on failure
      await this.adapter.rollbackTransaction();
      this.logger.error(
        `Failed to create table: ${createTableDto.tableName}`,
        error
      );

      // Return a structured error response
      return {
        success: false,
        message: `Failed to create table "${createTableDto.tableName}": ${error.message}`
      };
    }
  }

  async alterTable(alterTableDto: AlterTableDto): Promise<AlterTableResponse> {
    this.logger.info(
      `Altering table: ${alterTableDto.tableName}, Action: ${alterTableDto.action}`
    );
    try {
      // Start a transaction
      await this.adapter.startTransaction();

      // Step 1: Alter the table in the database
      if (alterTableDto.action === 'addColumn' && alterTableDto.column) {
        await this.adapter.alterTable(
          alterTableDto.tableName,
          alterTableDto.action,
          alterTableDto.column
        );
      }

      // Step 2: Update metadata in "FieldDefinition" (if applicable)
      let columnId: string | undefined;
      if (alterTableDto.action === 'addColumn' && alterTableDto.column) {
        const tableId = await this.adapter.getTableIdByName(
          alterTableDto.tableName
        );
        if (!tableId) {
          throw new Error(`Table not found: ${alterTableDto.tableName}`);
        }
        columnId = await this.adapter.insertFieldDefinition(
          tableId,
          alterTableDto.column
        );
      }

      // Commit the transaction
      await this.adapter.commitTransaction();
      this.logger.info(
        `Successfully altered table: ${alterTableDto.tableName}`
      );

      // Return a structured response
      return {
        success: true,
        message: `Column "${alterTableDto.column?.name}" added to table "${alterTableDto.tableName}" successfully.`,
        columnId
      };
    } catch (error) {
      // Rollback the transaction on failure
      await this.adapter.rollbackTransaction();
      this.logger.error(
        `Failed to alter table: ${alterTableDto.tableName}`,
        error
      );

      // Return a structured error response
      return {
        success: false,
        message: `Failed to alter table "${alterTableDto.tableName}": ${error.message}`
      };
    }
  }
}
