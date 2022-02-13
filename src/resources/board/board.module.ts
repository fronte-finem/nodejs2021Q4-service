import { Module } from '@nestjs/common';
import { BoardExistencePipe } from './board.existence.pipe';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';

@Module({
  controllers: [BoardController],
  providers: [BoardService, BoardExistencePipe],
  exports: [BoardExistencePipe],
})
export class BoardModule {}
