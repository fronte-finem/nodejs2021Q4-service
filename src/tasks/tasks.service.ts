import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  public create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  public findAll() {
    return `This action returns all tasks`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  public update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  public remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
