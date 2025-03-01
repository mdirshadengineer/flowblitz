import { registerEnumType } from '@nestjs/graphql';

export enum TableAction {
  ADD_COLUMN = 'addColumn',
  DROP_COLUMN = 'dropColumn',
  RENAME_COLUMN = 'renameColumn',
  ALTER_COLUMN = 'alterColumn'
}

// Register the enum with GraphQL
registerEnumType(TableAction, {
  name: 'TableAction', // Name of the enum in the GraphQL schema
  description:
    'Actions that can be performed on a table (e.g., addColumn, dropColumn)'
});
