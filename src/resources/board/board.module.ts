import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';

@Module({
  controllers: [BoardController],
  providers: [BoardService, PrismaService],
})
export class BoardModule {}
