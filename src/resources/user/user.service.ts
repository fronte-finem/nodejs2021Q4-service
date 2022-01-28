import { Injectable, NotFoundException } from '@nestjs/common';
import { throwExpression } from '../../common/error.helpers';
import { mapPrismaErrorToNestException } from '../../common/prisma.error';
import { PrismaService } from '../../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const userResponse = { id: true, name: true, login: true };

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    try {
      return await this.prisma.user.create({ data: createUserDto, select: userResponse });
    } catch (error: unknown) {
      throw mapPrismaErrorToNestException(error);
    }
  }

  async findAll(): Promise<ResponseUserDto[]> {
    try {
      return await this.prisma.user.findMany({ select: userResponse });
    } catch (error: unknown) {
      throw mapPrismaErrorToNestException(error);
    }
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    let result: ResponseUserDto | null = null;
    try {
      result = await this.prisma.user.findUnique({ where: { id }, select: userResponse });
    } catch (error: unknown) {
      throw mapPrismaErrorToNestException(error);
    }
    return result ?? throwExpression(new NotFoundException(`User record #${id} not found!`));
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
        select: userResponse,
      });
    } catch (error: unknown) {
      throw mapPrismaErrorToNestException(error);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error: unknown) {
      throw mapPrismaErrorToNestException(error);
    }
  }
}
