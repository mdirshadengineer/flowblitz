import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BaseResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;
}

@ObjectType()
export class CreateTableResponse extends BaseResponse {
  @Field(() => String, { nullable: true })
  tableId?: string; // ID of the created table in TableDefinition
}

@ObjectType()
export class AlterTableResponse extends BaseResponse {
  @Field(() => String, { nullable: true })
  columnId?: string; // ID of the altered column in FieldDefinition
}
