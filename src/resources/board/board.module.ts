import { Logger, Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';

@Module({
  controllers: [BoardController],
  providers: [BoardService, Logger, PrismaService],
})
export class BoardModule {}
