import { Controller, Get, Post, Put, Delete, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { RoutePrefix, BY_ID, Id } from '../routes';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { ResponseBoardDto } from './dto/response-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller(RoutePrefix.BOARDS)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto): Promise<ResponseBoardDto> {
    return this.boardService.create(createBoardDto);
  }

  @Get()
  async findAll(): Promise<ResponseBoardDto[]> {
    return this.boardService.findAll();
  }

  @Get(BY_ID)
  async findOne(@Id id: string): Promise<ResponseBoardDto> {
    return this.boardService.findOne(id);
  }

  @Put(BY_ID)
  async update(@Id id: string, @Body() updateBoardDto: UpdateBoardDto): Promise<ResponseBoardDto> {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(BY_ID)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Id id: string): Promise<void> {
    await this.boardService.remove(id);
  }
}
