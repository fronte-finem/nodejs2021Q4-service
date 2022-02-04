import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { BoardExistencePipe } from './board.existence.pipe';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';

@Module({
  controllers: [BoardController],
  providers: [PrismaService, BoardService, BoardExistencePipe],
  exports: [BoardExistencePipe],
})
export class BoardModule {}
