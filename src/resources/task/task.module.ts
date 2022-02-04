import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { BoardPipe } from '../board/board.pipe';
import { BoardService } from '../board/board.service';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  controllers: [TaskController],
  providers: [PrismaService, BoardService, BoardPipe, TaskService],
})
export class TaskModule {}
