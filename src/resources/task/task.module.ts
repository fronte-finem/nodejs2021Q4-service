import { Logger, Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  controllers: [TaskController],
  providers: [TaskService, Logger, PrismaService],
})
export class TaskModule {}
