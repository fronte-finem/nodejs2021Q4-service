import { Controller, Get, Post, Put, Body, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const ID = 'id';
const USER_BY_ID = `:${ID}`;
const Id = Param(ID, ParseUUIDPipe);

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  public findAll() {
    return this.usersService.findAll();
  }

  @Get(USER_BY_ID)
  public findOne(@Id id: string) {
    return this.usersService.findOne(id);
  }

  @Put(USER_BY_ID)
  public update(@Id id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(USER_BY_ID)
  public remove(@Id id: string) {
    return this.usersService.remove(id);
  }
}
