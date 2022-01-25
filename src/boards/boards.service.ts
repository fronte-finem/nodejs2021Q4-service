import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  public create(createBoardDto: CreateBoardDto) {
    return 'This action adds a new board';
  }

  public findAll() {
    return `This action returns all boards`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  public update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  public remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
