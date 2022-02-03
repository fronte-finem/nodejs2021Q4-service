import { Controller, Get, Post, Put, Delete, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../common/decorators';
import { RoutePrefix, BY_ID, BoardId, Id } from '../routes';
import { ColumnService } from './column.service';
import { ColumnCreateDto } from './dto/column-create.dto';
import { ColumnResponseDto } from './dto/column-response.dto';
import { ColumnUpdateDto } from './dto/column-update.dto';

@ApiTags('Columns')
@ApiResponse.Forbidden
@ApiResponse.BadRequest
@ApiResponse.NotFound
@Controller(RoutePrefix.COLUMNS)
export class ColumnController {
  constructor(private readonly taskService: ColumnService) {}

  @Post()
  public create(
    @BoardId boardId: string,
    @Body() columnCreateDto: ColumnCreateDto
  ): Promise<ColumnResponseDto> {
    return this.taskService.create(boardId, columnCreateDto);
  }

  @Get()
  public findAll(@BoardId boardId: string): Promise<ColumnResponseDto[]> {
    return this.taskService.findAll(boardId);
  }

  @Get(BY_ID)
  public findOne(@BoardId boardId: string, @Id id: string): Promise<ColumnResponseDto> {
    return this.taskService.findOne(boardId, id);
  }

  @Put(BY_ID)
  public update(
    @BoardId boardId: string,
    @Id id: string,
    @Body() columnUpdateDto: ColumnUpdateDto
  ): Promise<ColumnResponseDto> {
    return this.taskService.update(boardId, id, columnUpdateDto);
  }

  @Delete(BY_ID)
  @ApiResponse.NoContent
  @HttpCode(HttpStatus.NO_CONTENT)
  public remove(@BoardId boardId: string, @Id id: string): Promise<void> {
    return this.taskService.remove(boardId, id);
  }
}
