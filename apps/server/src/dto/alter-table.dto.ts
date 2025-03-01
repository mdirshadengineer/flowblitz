import { InputType, Field } from '@nestjs/graphql';
import { IsString, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ColumnDto } from './create-table.dto';
import { TableAction } from 'src/enums/table-action.enum';

@InputType()
export class AlterTableDto {
  @Field(() => String)
  @IsString()
  tableName: string;

  @Field(() => TableAction)
  @IsEnum(TableAction)
  action: TableAction;

  @Field(() => ColumnDto, { nullable: true })
  @ValidateNested()
  @Type(() => ColumnDto)
  column?: ColumnDto;
}
