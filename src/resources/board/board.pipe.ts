import { PipeTransform, Injectable } from '@nestjs/common';
import { BoardService } from './board.service';

@Injectable()
export class BoardPipe implements PipeTransform {
  constructor(private readonly boardService: BoardService) {}

  async transform(boardId: string) {
    await this.boardService.exists(boardId);
    return boardId;
  }
}
