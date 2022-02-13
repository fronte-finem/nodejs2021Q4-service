import { Controller, Get, Post, Put, Delete, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../common/decorators';
import { OpenApiTag } from '../../open-api/setup-open-api';
import { RoutePrefix, BY_ID, Id } from '../routes';
import { BoardService } from './board.service';
import { BoardCreateDto } from './dto/board-create.dto';
import { BoardResponseDto } from './dto/board-response.dto';
import { BoardUpdateDto } from './dto/board-update.dto';

@ApiTags(OpenApiTag.BOARDS)
@ApiBearerAuth()
@ApiResponse.Unauthorized
@Controller(RoutePrefix.BOARDS)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @ApiResponse.BadRequest
  async create(@Body() boardCreateDto: BoardCreateDto): Promise<BoardResponseDto> {
    return this.boardService.create(boardCreateDto);
  }

  @Get()
  async findAll(): Promise<BoardResponseDto[]> {
    return this.boardService.findAll();
  }

  @Get(BY_ID)
  @ApiResponse.BadRequest
  @ApiResponse.NotFound
  async findOne(@Id id: string): Promise<BoardResponseDto> {
    return this.boardService.findOne(id);
  }

  @Put(BY_ID)
  @ApiResponse.BadRequest
  @ApiResponse.NotFound
  async update(@Id id: string, @Body() boardUpdateDto: BoardUpdateDto): Promise<BoardResponseDto> {
    return this.boardService.update(id, boardUpdateDto);
  }

  @Delete(BY_ID)
  @ApiResponse.BadRequest
  @ApiResponse.NotFound
  @ApiResponse.NoContent
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Id id: string): Promise<void> {
    return this.boardService.remove(id);
  }
}
