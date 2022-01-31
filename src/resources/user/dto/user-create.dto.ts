import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  name!: string;

  @MinLength(3)
  @Matches(/\w+/)
  login!: string;

  @MinLength(8)
  password!: string;
}
