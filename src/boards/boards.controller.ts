import { Controller, Get, Post, Put, Body, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

const ID = 'id';
const BOARD_BY_ID = `:${ID}`;
const Id = Param(ID, ParseUUIDPipe);

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  public create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  public findAll() {
    return this.boardsService.findAll();
  }

  @Get(BOARD_BY_ID)
  public findOne(@Id id: string) {
    return this.boardsService.findOne(id);
  }

  @Put(BOARD_BY_ID)
  public update(@Id id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(id, updateBoardDto);
  }

  @Delete(BOARD_BY_ID)
  public remove(@Id id: string) {
    return this.boardsService.remove(id);
  }
}
