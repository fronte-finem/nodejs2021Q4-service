import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class TaskUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiProperty({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  userId?: string | null = null;

  @ApiProperty({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  boardId?: string | null = null;

  @ApiProperty({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  columnId?: string | null = null;
}
