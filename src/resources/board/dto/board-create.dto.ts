import { IsArray, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { ColumnCreateDto } from '../../column/dto/column-create.dto';

export class BoardCreateDto {
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  columns?: ColumnCreateDto[] = [];
}
