import { Injectable, NotFoundException } from '@nestjs/common';
import { throwExpression } from '../../common/error.helpers';
import { mapPrismaErrorToNestException } from '../../common/prisma.error';
import { PrismaService } from '../../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ResponseTaskDto } from './dto/response-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(boardId: string, createTaskDto: CreateTaskDto): Promise<ResponseTaskDto> {
    try {
      return await this.prisma.task.create({ data: { ...createTaskDto, boardId } });
    } catch (error: unknown) {
      throw mapPrismaErrorToNestException(error);
    }
  }

  async findAll(boardId: string): Promise<ResponseTaskDto[]> {
    try {
      return await this.prisma.task.findMany({ where: { boardId } });
    } catch (error: unknown) {
      throw mapPrismaErrorToNestException(error);
    }
  }

  async findOne(boardId: string, id: string): Promise<ResponseTaskDto> {
    let result: ResponseTaskDto | null = null;
    try {
      result = await this.prisma.task.findUnique({ where: { id } });
    } catch (error: unknown) {
      throw mapPrismaErrorToNestException(error);
    }
    return result ?? throwExpression(new NotFoundException(`Task record #${id} not found!`));
  }

  async update(
    boardId: string,
    id: string,
    updateTaskDto: UpdateTaskDto
  ): Promise<ResponseTaskDto> {
    try {
      return await this.prisma.task.update({ where: { id }, data: updateTaskDto });
    } catch (error: unknown) {
      throw mapPrismaErrorToNestException(error);
    }
  }

  async remove(boardId: string, id: string): Promise<void> {
    try {
      await this.prisma.task.delete({ where: { id } });
    } catch (error: unknown) {
      throw mapPrismaErrorToNestException(error);
    }
  }
}
