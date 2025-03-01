import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { DatabaseService } from '../../database/database.service';
import { CreateTableDto } from 'src/dto/create-table.dto';
import { AlterTableDto } from 'src/dto/alter-table.dto';
import { CreateTableResponse, AlterTableResponse } from 'src/dto/response.dto';

@Resolver()
export class DatabaseResolver {
  constructor(private readonly databaseService: DatabaseService) {}

  @Mutation(() => CreateTableResponse)
  async createTable(
    @Args('input') input: CreateTableDto
  ): Promise<CreateTableResponse> {
    try {
      const tableId = (await this.databaseService.createTable(input)).tableId;
      return {
        success: true,
        message: `Table "${input.tableName}" created successfully.`,
        tableId
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to create table "${input.tableName}": ${error.message}`
      };
    }
  }

  @Mutation(() => AlterTableResponse)
  async alterTable(
    @Args('input') input: AlterTableDto
  ): Promise<AlterTableResponse> {
    try {
      const columnId = (await this.databaseService.alterTable(input)).columnId;
      return {
        success: true,
        message: `Column "${input.column?.name}" added to table "${input.tableName}" successfully.`,
        columnId
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to alter table "${input.tableName}": ${error.message}`
      };
    }
  }
}
