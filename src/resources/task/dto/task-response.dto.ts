import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class TaskResponseDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  id!: string;

  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  description!: string;

  @IsNumber()
  order!: number;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userId!: string | null;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  boardId!: string | null;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  columnId!: string | null;
}
