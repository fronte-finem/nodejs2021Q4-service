import { Injectable, NotFoundException } from '@nestjs/common';
import { throwExpression } from '../../errors';
import { PrismaService } from '../../services/prisma.service';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { TaskUpdateDto } from './dto/task-update.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(boardId: string, taskCreateDto: TaskCreateDto): Promise<TaskResponseDto> {
    return this.prisma.task.create({ data: { ...taskCreateDto, boardId } });
  }

  async findAll(boardId: string): Promise<TaskResponseDto[]> {
    return this.prisma.task.findMany({ where: { boardId } });
  }

  async findOne(boardId: string, id: string): Promise<TaskResponseDto> {
    const result = await this.prisma.task.findUnique({ where: { id } });
    return result ?? throwExpression(new NotFoundException(`Task record #${id} not found!`));
  }

  async update(
    boardId: string,
    id: string,
    taskUpdateDto: TaskUpdateDto
  ): Promise<TaskResponseDto> {
    return this.prisma.task.update({ where: { id }, data: taskUpdateDto });
  }

  async remove(boardId: string, id: string): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }
}
