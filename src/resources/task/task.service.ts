import { Injectable, NotFoundException } from '@nestjs/common';
import { throwExpression } from '../../errors';
import { PrismaService } from '../../prisma/prisma.service';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { TaskUpdateDto } from './dto/task-update.dto';

const throwTaskNotFound = (id: string, boardId: string) =>
  throwExpression(new NotFoundException(`Task [${id}] for board [${boardId}] not found!`));

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
    const result = await this.prisma.task.findFirst({ where: { id, boardId } });
    return result ?? throwTaskNotFound(id, boardId);
  }

  async exists(boardId: string, id: string): Promise<{ id: string }> {
    const result = await this.prisma.task.findFirst({
      where: { id, boardId },
      select: { id: true },
    });
    return result ?? throwTaskNotFound(id, boardId);
  }

  async update(
    boardId: string,
    id: string,
    taskUpdateDto: TaskUpdateDto
  ): Promise<TaskResponseDto> {
    await this.exists(boardId, id);
    return this.prisma.task.update({ where: { id }, data: taskUpdateDto });
  }

  async remove(boardId: string, id: string): Promise<void> {
    await this.exists(boardId, id);
    await this.prisma.task.delete({ where: { id } });
  }
}
