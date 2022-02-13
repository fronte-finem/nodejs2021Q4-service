import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsUUID, ValidateNested } from 'class-validator';
import { ColumnResponseDto } from '../../column/dto/column-response.dto';

export class BoardResponseDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  id!: string;

  @IsNumber()
  title!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ColumnResponseDto)
  columns!: ColumnResponseDto[];
}
