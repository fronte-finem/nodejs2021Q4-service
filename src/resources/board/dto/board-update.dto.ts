import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { ColumnUpdateDto } from '../../column/dto/column-update.dto';

export class BoardUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsArray()
  columns?: ColumnUpdateDto[] = [];
}
