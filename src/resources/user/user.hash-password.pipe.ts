import { Injectable, PipeTransform } from '@nestjs/common';
import { hash } from 'bcrypt';
import { envVars } from '../../config/env.validation';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';

type UserDto = UserCreateDto | UserUpdateDto;

@Injectable()
export class UserHashPasswordPipe implements PipeTransform {
  async transform(userDto: UserCreateDto): Promise<UserCreateDto>;
  async transform(userDto: UserUpdateDto): Promise<UserUpdateDto>;
  async transform(userDto: UserDto): Promise<UserDto> {
    if (!userDto.password) return userDto;
    const password = await hash(userDto.password, envVars.BCRYPT_HASH_ROUNDS);
    return { ...userDto, password };
  }
}
