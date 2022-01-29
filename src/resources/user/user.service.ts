import { Injectable, NotFoundException } from '@nestjs/common';
import { throwExpression } from '../../errors';
import { PrismaService } from '../../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const userResponse = { id: true, name: true, login: true };

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return this.prisma.user.create({ data: createUserDto, select: userResponse });
  }

  async findAll(): Promise<ResponseUserDto[]> {
    return this.prisma.user.findMany({ select: userResponse });
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    const result = await this.prisma.user.findUnique({ where: { id }, select: userResponse });
    return result ?? throwExpression(new NotFoundException(`User record #${id} not found!`));
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: userResponse,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
