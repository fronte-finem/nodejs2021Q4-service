import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  public create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  public findAll() {
    return `This action returns all users`;
  }

  public findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  public update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  public remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
