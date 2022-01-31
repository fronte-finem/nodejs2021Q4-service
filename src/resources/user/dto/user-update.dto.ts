import { IsAlphanumeric, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsAlphanumeric()
  @MinLength(3)
  login?: string;

  @IsOptional()
  @MinLength(8)
  password?: string;
}
