import { IsArray, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { ColumnUpdateDto } from '../../column/dto/column-update.dto';

export class BoardUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  columns?: ColumnUpdateDto[] = [];
}
