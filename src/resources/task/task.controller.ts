import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  UseFilters,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../common/decorators';
import { AllExceptionsFilter } from '../../filters/all-exceptions.filter';
import { RoutePrefix, BY_ID, BoardId, Id } from '../routes';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@ApiTags('Tasks')
@ApiResponse.Forbidden
@ApiResponse.BadRequest
@ApiResponse.NotFound
@Controller(RoutePrefix.TASKS)
@UseFilters(AllExceptionsFilter)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  public create(@BoardId boardId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(boardId, createTaskDto);
  }

  @Get()
  public findAll(@BoardId boardId: string) {
    return this.taskService.findAll(boardId);
  }

  @Get(BY_ID)
  public findOne(@BoardId boardId: string, @Id id: string) {
    return this.taskService.findOne(boardId, id);
  }

  @Put(BY_ID)
  public update(@BoardId boardId: string, @Id id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(boardId, id, updateTaskDto);
  }

  @Delete(BY_ID)
  @ApiResponse.NoContent
  @HttpCode(HttpStatus.NO_CONTENT)
  public remove(@BoardId boardId: string, @Id id: string) {
    return this.taskService.remove(boardId, id);
  }
}
