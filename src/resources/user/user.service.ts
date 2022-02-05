import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { throwExpression } from '../../errors';
import { PrismaService } from '../../prisma/prisma.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserUpdateDto } from './dto/user-update.dto';

const userResponse = { id: true, name: true, login: true };

const throwUserNotFound = (id: string) =>
  throwExpression(new NotFoundException(`User [${id}] not found!`));

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
    return result ?? throwUserNotFound(id);
  }

  async exists(id: string): Promise<{ id: string }> {
    const result = await this.prisma.user.findUnique({ where: { id }, select: { id: true } });
    return result ?? throwUserNotFound(id);
  }

  async update(id: string, userUpdateDto: UserUpdateDto): Promise<UserResponseDto> {
    await this.exists(id);
    return this.prisma.user.update({
      where: { id },
      data: userUpdateDto,
      select: userResponse,
    });
  }

  async remove(id: string): Promise<void> {
    await this.exists(id);
    await this.prisma.user.delete({ where: { id } });
  }

  async findByLogin(login: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { login } });
  }
}
