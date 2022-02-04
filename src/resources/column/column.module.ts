import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { BoardModule } from '../board/board.module';
import { BoardExistencePipe } from '../board/board.existence.pipe';
import { BoardService } from '../board/board.service';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';

@Module({
  imports: [BoardModule],
  controllers: [ColumnController],
  providers: [PrismaService, BoardService, BoardExistencePipe, ColumnService],
})
export class ColumnModule {}
