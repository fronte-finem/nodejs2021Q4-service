import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { BoardModule } from '../board/board.module';
import { BoardPipe } from '../board/board.pipe';
import { BoardService } from '../board/board.service';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';

@Module({
  imports: [BoardModule],
  controllers: [ColumnController],
  providers: [PrismaService, BoardService, BoardPipe, ColumnService],
})
export class ColumnModule {}
