import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsUUID } from 'class-validator';
import { ColumnResponseDto } from '../../column/dto/column-response.dto';

export class BoardResponseDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  id!: string;

  @IsNumber()
  title!: string;

  @IsArray()
  columns!: ColumnResponseDto[];
}
