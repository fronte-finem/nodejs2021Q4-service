import { Module, NestModule, MiddlewareConsumer, Logger } from '@nestjs/common';
// import { json as bodyParserJson } from 'body-parser';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { IS_FASTIFY } from './common/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { PrismaService } from './prisma.service';
import { BoardModule } from './resources/board/board.module';
import { TaskModule } from './resources/task/task.module';
import { UserModule } from './resources/user/user.module';

@Module({
  imports: [UserModule, BoardModule, TaskModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, Logger],
  exports: [PrismaService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // if (IS_FASTIFY) {
    //   consumer.apply(bodyParserJson(), LoggerMiddleware).forRoutes('*');
    // }
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
