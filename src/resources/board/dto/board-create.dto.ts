import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { ColumnCreateDto } from '../../column/dto/column-create.dto';

export class BoardCreateDto {
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsArray()
  columns?: ColumnCreateDto[] = [];
}
