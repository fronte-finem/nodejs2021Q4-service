import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class ColumnUpdateDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  id!: string;

  @IsNotEmpty()
  title!: string;

  @IsNumber()
  order!: number;
}
