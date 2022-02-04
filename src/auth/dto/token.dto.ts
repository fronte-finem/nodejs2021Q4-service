import { IsNotEmpty } from 'class-validator';

export class TokenDto {
  @IsNotEmpty()
  userId!: string;

  @IsNotEmpty()
  login!: string;
}
