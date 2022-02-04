import { Controller, Get, Post, Put, Delete, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../common/decorators';
import { RoutePrefix, BY_ID, Id } from '../routes';
import { UserCreateDto } from './dto/user-create.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserHashPasswordPipe } from './user.hash-password.pipe';
import { UserService } from './user.service';

@ApiTags('Users')
@ApiBearerAuth()
@ApiResponse.Unauthorized
@Controller(RoutePrefix.USERS)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse.BadRequest
  async create(@Body(UserHashPasswordPipe) userCreateDto: UserCreateDto): Promise<UserResponseDto> {
    return this.userService.create(userCreateDto);
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @Get(BY_ID)
  @ApiResponse.BadRequest
  @ApiResponse.NotFound
  async findOne(@Id id: string): Promise<UserResponseDto> {
    return this.userService.findOne(id);
  }

  @Put(BY_ID)
  @ApiResponse.BadRequest
  @ApiResponse.NotFound
  async update(
    @Id id: string,
    @Body(UserHashPasswordPipe) userUpdateDto: UserUpdateDto
  ): Promise<UserResponseDto> {
    return this.userService.update(id, userUpdateDto);
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
