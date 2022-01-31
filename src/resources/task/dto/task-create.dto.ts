import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class TaskCreateDto {
  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  description!: string;

  @IsNumber()
  order!: number;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userId?: string | null = null;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  boardId?: string | null = null;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  columnId?: string | null = null;
}
