import { IsNotEmpty, IsOptional, Matches, MinLength } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @MinLength(3)
  @Matches(/\w+/)
  login?: string;

  @IsOptional()
  @MinLength(8)
  password?: string;
}
