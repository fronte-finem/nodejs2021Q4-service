import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  name!: string;

  @IsAlphanumeric()
  @MinLength(3)
  login!: string;

  @MinLength(8)
  password!: string;
}
