import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { BoardExistencePipe } from '../board/board.existence.pipe';
import { BoardService } from '../board/board.service';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  controllers: [TaskController],
  providers: [PrismaService, BoardService, BoardExistencePipe, TaskService],
})
export class TaskModule {}
