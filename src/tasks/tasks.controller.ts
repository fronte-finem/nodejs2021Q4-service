import { Controller, Get, Post, Put, Body, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

const BOARD_ID = 'boardId';
const ID = 'id';

const TASKS = `:${BOARD_ID}/tasks`;
const TASK_BY_ID = `${TASKS}/:${ID}`;

const BoardId = Param(BOARD_ID, ParseUUIDPipe);
const Id = Param(ID, ParseUUIDPipe);

@Controller('boards')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(TASKS)
  public create(@BoardId boardId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(boardId, createTaskDto);
  }

  @Get(TASKS)
  public findAll(@BoardId boardId: string) {
    return this.tasksService.findAll(boardId);
  }

  @Get(TASK_BY_ID)
  public findOne(@BoardId boardId: string, @Id id: string) {
    return this.tasksService.findOne(boardId, id);
  }

  @Put(TASK_BY_ID)
  public update(@BoardId boardId: string, @Id id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(boardId, id, updateTaskDto);
  }

  @Delete(TASK_BY_ID)
  public remove(@BoardId boardId: string, @Id id: string) {
    return this.tasksService.remove(boardId, id);
  }
}
