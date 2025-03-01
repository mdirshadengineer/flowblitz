export interface DatabaseAdapter {
  // Core database operations
  createTable(tableName: string, columns: any[]): Promise<void>;
  alterTable(tableName: string, action: string, column?: any): Promise<void>;

  // Metadata operations
  insertTableDefinition(tableName: string): Promise<string>;
  getTableIdByName(tableName: string): Promise<string | null>;
  insertFieldDefinition(tableId: string, column: any): Promise<string>;

  // Transaction management
  startTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
}

export abstract class BaseDatabaseAdapter implements DatabaseAdapter {
  // Core database operations
  abstract createTable(tableName: string, columns: any[]): Promise<void>;
  abstract alterTable(
    tableName: string,
    action: string,
    column?: any
  ): Promise<void>;

  // Metadata operations
  abstract insertTableDefinition(tableName: string): Promise<string>; // Returns tableId as a UUID (string)
  abstract getTableIdByName(tableName: string): Promise<string | null>; // Returns tableId as a UUID (string) or null
  abstract insertFieldDefinition(tableId: string, column: any): Promise<string>; // Uses string for tableId and returns columnId as a UUID (string)

  // Transaction management
  abstract startTransaction(): Promise<void>;
  abstract commitTransaction(): Promise<void>;
  abstract rollbackTransaction(): Promise<void>;
}
