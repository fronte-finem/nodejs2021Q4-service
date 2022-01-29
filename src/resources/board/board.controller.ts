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
import { RoutePrefix, BY_ID, Id } from '../routes';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { ResponseBoardDto } from './dto/response-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@ApiTags('Boards')
@ApiResponse.Forbidden
@Controller(RoutePrefix.BOARDS)
@UseFilters(AllExceptionsFilter)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @ApiResponse.BadRequest
  async create(@Body() createBoardDto: CreateBoardDto): Promise<ResponseBoardDto> {
    return this.boardService.create(createBoardDto);
  }

  @Get()
  async findAll(): Promise<ResponseBoardDto[]> {
    return this.boardService.findAll();
  }

  @Get(BY_ID)
  @ApiResponse.BadRequest
  @ApiResponse.NotFound
  async findOne(@Id id: string): Promise<ResponseBoardDto> {
    return this.boardService.findOne(id);
  }

  @Put(BY_ID)
  @ApiResponse.BadRequest
  @ApiResponse.NotFound
  async update(@Id id: string, @Body() updateBoardDto: UpdateBoardDto): Promise<ResponseBoardDto> {
    return this.boardService.update(id, updateBoardDto);
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
