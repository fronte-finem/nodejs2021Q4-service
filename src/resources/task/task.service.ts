import { Injectable, NotFoundException } from '@nestjs/common';
import { throwExpression } from '../../errors';
import { PrismaService } from '../../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ResponseTaskDto } from './dto/response-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(boardId: string, createTaskDto: CreateTaskDto): Promise<ResponseTaskDto> {
    return this.prisma.task.create({ data: { ...createTaskDto, boardId } });
  }

  async findAll(boardId: string): Promise<ResponseTaskDto[]> {
    return this.prisma.task.findMany({ where: { boardId } });
  }

  async findOne(boardId: string, id: string): Promise<ResponseTaskDto> {
    const result = await this.prisma.task.findUnique({ where: { id } });
    return result ?? throwExpression(new NotFoundException(`Task record #${id} not found!`));
  }

  async update(
    boardId: string,
    id: string,
    updateTaskDto: UpdateTaskDto
  ): Promise<ResponseTaskDto> {
    return this.prisma.task.update({ where: { id }, data: updateTaskDto });
  }

  async remove(boardId: string, id: string): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }
}
