import { IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty()
  login!: string;

  @IsNotEmpty()
  password!: string;
}
