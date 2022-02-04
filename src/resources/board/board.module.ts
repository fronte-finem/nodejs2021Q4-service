import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { BoardPipe } from './board.pipe';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';

@Module({
  controllers: [BoardController],
  providers: [PrismaService, BoardService, BoardPipe],
  exports: [BoardPipe],
})
export class BoardModule {}
