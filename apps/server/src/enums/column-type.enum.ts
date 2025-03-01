import { registerEnumType } from '@nestjs/graphql';

export enum ColumnType {
  String = 'String',
  Integer = 'Integer',
  Boolean = 'Boolean',
  Date = 'Date',
  Json = 'Json',
  Reference = 'Reference'
}

// Register the enum with GraphQL
registerEnumType(ColumnType, {
  name: 'ColumnType', // Name of the enum in the GraphQL schema
  description: 'Allowed types for columns in a table'
});
