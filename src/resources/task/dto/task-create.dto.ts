import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class TaskCreateDto {
  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  description!: string;

  @IsNumber()
  order!: number;

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
