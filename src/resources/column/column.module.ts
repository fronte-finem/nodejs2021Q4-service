import { Module } from '@nestjs/common';
import { BoardModule } from '../board/board.module';
import { BoardExistencePipe } from '../board/board.existence.pipe';
import { BoardService } from '../board/board.service';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';

@Module({
  imports: [BoardModule],
  controllers: [ColumnController],
  providers: [BoardService, BoardExistencePipe, ColumnService],
})
export class ColumnModule {}
