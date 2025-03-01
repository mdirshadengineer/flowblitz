import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTableDto } from 'src/dto/create-table.dto';
import { AlterTableDto } from 'src/dto/alter-table.dto';
import { CreateTableResponse, AlterTableResponse } from 'src/dto/response.dto';

@Controller('api/database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post('create-table')
  @HttpCode(HttpStatus.CREATED) // Use 201 Created for resource creation
  async createTable(
    @Body() createTableDto: CreateTableDto
  ): Promise<CreateTableResponse> {
    try {
      const response = await this.databaseService.createTable(createTableDto);
      return response;
    } catch (error) {
      console.error('Failed to create table:', error.message);
      throw error; // Let the global exception handler handle the error
    }
  }

  @Post('alter-table')
  @HttpCode(HttpStatus.OK) // Use 200 OK for updates
  async alterTable(
    @Body() alterTableDto: AlterTableDto
  ): Promise<AlterTableResponse> {
    try {
      const response = await this.databaseService.alterTable(alterTableDto);
      return response;
    } catch (error) {
      console.error('Failed to alter table:', error.message);
      throw error; // Let the global exception handler handle the error
    }
  }
}
