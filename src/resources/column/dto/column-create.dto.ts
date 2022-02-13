import { IsNotEmpty, IsNumber } from 'class-validator';

export class ColumnCreateDto {
  @IsNotEmpty()
  title!: string;

  @IsNumber()
  order!: number;
}
