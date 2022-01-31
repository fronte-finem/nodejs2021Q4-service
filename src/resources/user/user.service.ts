import { Injectable, NotFoundException } from '@nestjs/common';
import { throwExpression } from '../../errors';
import { PrismaService } from '../../services/prisma.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserUpdateDto } from './dto/user-update.dto';

const userResponse = { id: true, name: true, login: true };

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userCreateDto: UserCreateDto): Promise<UserResponseDto> {
    return this.prisma.user.create({ data: userCreateDto, select: userResponse });
  }

  async findAll(): Promise<UserResponseDto[]> {
    return this.prisma.user.findMany({ select: userResponse });
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const result = await this.prisma.user.findUnique({ where: { id }, select: userResponse });
    return result ?? throwExpression(new NotFoundException(`User record #${id} not found!`));
  }

  async update(id: string, userUpdateDto: UserUpdateDto): Promise<UserResponseDto> {
    return this.prisma.user.update({
      where: { id },
      data: userUpdateDto,
      select: userResponse,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
