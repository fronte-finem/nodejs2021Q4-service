import { Body, Controller, Delete, Get, Post, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { RoutePrefix, TASKS, TASK_BY_ID, BoardId, Id } from '../routes';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@Controller(RoutePrefix.TASKS)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(TASKS)
  public create(@BoardId boardId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(boardId, createTaskDto);
  }

  @Get(TASKS)
  public findAll(@BoardId boardId: string) {
    return this.taskService.findAll(boardId);
  }

  @Get(TASK_BY_ID)
  public findOne(@BoardId boardId: string, @Id id: string) {
    return this.taskService.findOne(boardId, id);
  }

  @Put(TASK_BY_ID)
  public update(@BoardId boardId: string, @Id id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(boardId, id, updateTaskDto);
  }

  @Delete(TASK_BY_ID)
  @HttpCode(HttpStatus.NO_CONTENT)
  public remove(@BoardId boardId: string, @Id id: string) {
    return this.taskService.remove(boardId, id);
  }
}
