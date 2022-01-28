import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { BoardModule } from './resources/board/board.module';
import { TaskModule } from './resources/task/task.module';
import { UserModule } from './resources/user/user.module';

@Module({
  imports: [UserModule, BoardModule, TaskModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
