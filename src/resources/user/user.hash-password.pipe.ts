import { Injectable, PipeTransform } from '@nestjs/common';
import { hash } from 'bcrypt';
import { EnvConfigService } from '../../config/env.config.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';

type UserDto = UserCreateDto | UserUpdateDto;

@Injectable()
export class UserHashPasswordPipe implements PipeTransform {
  constructor(private readonly configService: EnvConfigService) {}

  async transform(userDto: UserCreateDto): Promise<UserCreateDto>;
  async transform(userDto: UserUpdateDto): Promise<UserUpdateDto>;
  async transform(userDto: UserDto): Promise<UserDto> {
    return hashPassword(this.configService.get('BCRYPT_HASH_ROUNDS'), userDto);
  }
}

export async function hashPassword(rounds: number, userDto: UserCreateDto): Promise<UserCreateDto>;
export async function hashPassword(rounds: number, userDto: UserUpdateDto): Promise<UserUpdateDto>;
export async function hashPassword(rounds: number, userDto: UserDto): Promise<UserDto> {
  if (!userDto.password) return userDto;
  const password = await hash(userDto.password, rounds);
  return { ...userDto, password };
}
