import { Module } from '@nestjs/common';
import { BoardExistencePipe } from '../board/board.existence.pipe';
import { BoardService } from '../board/board.service';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  controllers: [TaskController],
  providers: [BoardService, BoardExistencePipe, TaskService],
})
export class TaskModule {}
