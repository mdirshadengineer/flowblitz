import { BaseDatabaseAdapter } from './database.adapter';
import { Client } from 'pg';

export class PostgresAdapter extends BaseDatabaseAdapter {
  private client: Client;

  constructor() {
    super();
    this.client = new Client({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '4e-mdirshad__56-7', // Use environment variables or secrets management
      database: 'flowblitz'
    });
    this.client.connect();
  }

  async startTransaction(): Promise<void> {
    console.log('Starting transaction...');
    await this.client.query('BEGIN');
  }

  async commitTransaction(): Promise<void> {
    console.log('Committing transaction...');
    await this.client.query('COMMIT');
  }

  async rollbackTransaction(): Promise<void> {
    console.log('Rolling back transaction...');
    await this.client.query('ROLLBACK');
  }

  async createTable(tableName: string, columns: any[]): Promise<void> {
    // const columnDefinitions = columns.map(col => {
    //   const constraints = col.constraints ? col.constraints.join(' ') : '';
    //   return `"${col.name}" ${this.mapType(col.type)} ${constraints}`;
    // });
    // const query = `CREATE TABLE IF NOT EXISTS "${tableName}" (${columnDefinitions.join(', ')})`;
    // await this.client.query(query);
    try {
      const columnDefinitions = columns.map(col => {
        const constraints = col.constraints ? col.constraints.join(' ') : '';

        return `"${col.name}" ${this.mapType(col.type)} ${constraints}`;
      });

      const query = `CREATE TABLE IF NOT EXISTS "${tableName}" (${columnDefinitions.join(', ')})`;

      console.log('Executing query:', query); // Log the query

      await this.client.query(query);
    } catch (error) {
      console.error('Failed to create table:', error);
      throw error;
    }
  }

  async alterTable(
    tableName: string,
    action: string,
    column?: any
  ): Promise<void> {
    if (action === 'addColumn' && column) {
      const query = `ALTER TABLE "${tableName}" ADD COLUMN "${column.name}" ${this.mapType(column.type)}`;
      await this.client.query(query);
    }
    // Add more actions (e.g., dropColumn, renameColumn) as needed
  }

  async insertTableDefinition(tableName: string): Promise<string> {
    //   const query = `
    //   INSERT INTO "TableDefinition" (id, name, createdAt, updatedAt)
    //   VALUES (gen_random_uuid(), $1, NOW(), NOW())
    //   RETURNING id
    // `;
    //   const result = await this.client.query(query, [tableName]);
    //   return result.rows[0].id;
    try {
      const query = `
      INSERT INTO "tabledefinition" (id, name, createdAt, updatedAt)
      VALUES (gen_random_uuid(), $1, NOW(), NOW())
      RETURNING id
    `;

      console.log('Inserting table definition:', tableName);

      const result = await this.client.query(query, [tableName]);

      return result.rows[0].id; // Return the generated UUID
    } catch (error) {
      console.error('Failed to insert table definition:', error);

      throw error;
    }
  }

  async getTableIdByName(tableName: string): Promise<string | null> {
    // const query = `SELECT id FROM "Table Definition" WHERE name = $1`;
    // const result = await this.client.query(query, [tableName]);
    // return result.rows[0]?.id;
    try {
      const query = `SELECT id FROM "tabledefinition" WHERE name = $1`;

      console.log('Fetching table ID for:', tableName);

      const result = await this.client.query(query, [tableName]);

      return result.rows[0]?.id || null; // Return the UUID or null
    } catch (error) {
      console.error('Failed to fetch table ID:', error);

      throw error;
    }
  }

  async insertFieldDefinition(tableId: string, column: any): Promise<string> {
    // const query = `
    //   INSERT INTO "FieldDefinition" (
    //     id, tableDefinitionId, name, type, isRequired, maxLength, minLength, regex, createdAt, updatedAt
    //   ) VALUES (
    //     gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()
    //   )
    //   RETURNING id
    // `;
    // const result = await this.client.query(query, [
    //   tableId,
    //   column.name,
    //   column.type,
    //   column.isRequired || false,
    //   column.maxLength || null,
    //   column.minLength || null,
    //   column.regex || null
    // ]);
    // return result.rows[0].id;

    try {
      const query = `
        INSERT INTO "fielddefinition" (
          id, tableDefinitionId, name, type, isRequired, maxLength, minLength, regex, createdAt, updatedAt
        ) VALUES (
          gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()
        )
        RETURNING id
      `;

      console.log('Inserting field definition:', column.name);
      console.log('Insering ', column);
      const result = await this.client.query(query, [
        tableId,
        column.name,
        column.type,
        column.isRequired || false,
        column.maxLength || null,
        column.minLength || null,
        column.regex || null
      ]);

      return result.rows[0].id; // Return the generated UUID
    } catch (error) {
      console.error('Failed to insert field definition:', error);

      throw error;
    }
  }

  private mapType(type: string): string {
    switch (type.toLowerCase()) {
      case 'string':
        return 'TEXT'; // Maps to PostgreSQL TEXT type
      case 'integer':
        return 'INTEGER'; // Maps to PostgreSQL INTEGER type
      case 'boolean':
        return 'BOOLEAN'; // Maps to PostgreSQL BOOLEAN type
      case 'date':
        return 'TIMESTAMP'; // Maps to PostgreSQL TIMESTAMP type
      case 'json':
        return 'JSONB'; // Maps to PostgreSQL JSONB type
      case 'reference':
        return 'UUID'; // Maps to PostgreSQL UUID type
      default:
        throw new Error(`Unsupported column type: ${type}`);
    }
  }
}
