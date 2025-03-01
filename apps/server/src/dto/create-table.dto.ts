import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ColumnType } from 'src/enums/column-type.enum';

@InputType()
export class ColumnDto {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => ColumnType)
  @IsEnum(ColumnType)
  type: ColumnType;

  @Field(() => [String], { nullable: true })
  @IsArray()
  constraints?: string[];

  @Field(() => Boolean, { nullable: true })
  isRequired?: boolean;

  @Field(() => Number, { nullable: true })
  maxLength?: number;

  @Field(() => Number, { nullable: true })
  minLength?: number;

  @Field(() => String, { nullable: true })
  regex?: string;
}

@InputType()
export class CreateTableDto {
  @Field(() => String)
  @IsString()
  tableName: string;

  @Field(() => [ColumnDto])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ColumnDto)
  columns: ColumnDto[];
}
