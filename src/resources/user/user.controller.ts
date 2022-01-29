import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  UseFilters,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../common/decorators';
import { AllExceptionsFilter } from '../../filters/all-exceptions.filter';
import { RoutePrefix, BY_ID, Id } from '../routes';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@ApiResponse.Forbidden
@Controller(RoutePrefix.USERS)
@UseFilters(AllExceptionsFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse.BadRequest
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<ResponseUserDto[]> {
    return this.userService.findAll();
  }

  @Get(BY_ID)
  @ApiResponse.BadRequest
  @ApiResponse.NotFound
  async findOne(@Id id: string): Promise<ResponseUserDto> {
    return this.userService.findOne(id);
  }

  @Put(BY_ID)
  @ApiResponse.BadRequest
  @ApiResponse.NotFound
  async update(@Id id: string, @Body() updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(BY_ID)
  @ApiResponse.BadRequest
  @ApiResponse.NotFound
  @ApiResponse.NoContent
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Id id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
