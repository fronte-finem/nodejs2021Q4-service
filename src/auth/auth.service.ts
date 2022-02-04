import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { UserService } from '../resources/user/user.service';
import { TokenDto } from './dto/token.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(login: string, password: string): Promise<User | null> {
    const user = await this.userService.findByLogin(login);
    if (!user) return null;
    const success = await compare(password, user.password);
    if (!success) return null;
    return user;
  }

  async login({ id, login }: User): Promise<LoginResponseDto> {
    const tokenDto: TokenDto = { userId: id, login };
    const token = await this.jwtService.signAsync(tokenDto);
    return { token };
  }
}
