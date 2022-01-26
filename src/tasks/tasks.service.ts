import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  public create(boardId: string, createTaskDto: CreateTaskDto) {
    return `This action adds a new task to #${boardId} board`;
  }

  public findAll(boardId: string) {
    return `This action returns all tasks on #${boardId} board`;
  }

  public findOne(boardId: string, id: string) {
    return `This action returns a #${id} task on #${boardId} board`;
  }

  public update(boardId: string, id: string, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task on #${boardId} board`;
  }

  public remove(boardId: string, id: string) {
    return `This action removes a #${id} task from #${boardId} board`;
  }
}
