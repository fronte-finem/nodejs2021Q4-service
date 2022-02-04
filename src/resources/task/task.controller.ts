import { Controller, Get, Post, Put, Delete, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../common/decorators';
import { RoutePrefix, BY_ID, BoardId, Id } from '../routes';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskUpdateDto } from './dto/task-update.dto';
import { TaskService } from './task.service';

@ApiTags('Tasks')
@ApiBearerAuth()
@ApiResponse.Unauthorized
@ApiResponse.BadRequest
@ApiResponse.NotFound
@Controller(RoutePrefix.TASKS)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  public create(@BoardId boardId: string, @Body() taskCreateDto: TaskCreateDto) {
    return this.taskService.create(boardId, taskCreateDto);
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
  public update(@BoardId boardId: string, @Id id: string, @Body() taskUpdateDto: TaskUpdateDto) {
    return this.taskService.update(boardId, id, taskUpdateDto);
  }

  @Delete(BY_ID)
  @ApiResponse.NoContent
  @HttpCode(HttpStatus.NO_CONTENT)
  public remove(@BoardId boardId: string, @Id id: string) {
    return this.taskService.remove(boardId, id);
  }
}
