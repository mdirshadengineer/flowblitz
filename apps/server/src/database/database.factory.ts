import { BaseDatabaseAdapter } from './database.adapter';
import { PostgresAdapter } from './postgres.adapter';

export enum DatabaseType {
  POSTGRES = 'postgres',
  MYSQL = 'mysql',
  SQLITE = 'sqlite'
}

export class DatabaseFactory {
  static getAdapter(type: DatabaseType): BaseDatabaseAdapter {
    switch (type) {
      case DatabaseType.POSTGRES:
        return new PostgresAdapter();
      case DatabaseType.MYSQL:
        throw new Error('MySQL adapter not implemented');
      case DatabaseType.SQLITE:
        throw new Error('SQLite adapter not implemented');
      default:
        throw new Error(`Unsupported database type: ${type}`);
    }
  }
}
