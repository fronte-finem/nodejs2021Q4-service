import { Module, NestModule, MiddlewareConsumer, Logger } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggingInterceptor } from './interceptors/logging-interceptor.service';
import { LoggingMiddleware } from './middlewares/logging-middleware.service';
import { BoardModule } from './resources/board/board.module';
import { TaskModule } from './resources/task/task.module';
import { UserModule } from './resources/user/user.module';
import { PrismaService } from './services/prisma.service';
import { RequestIdService } from './services/request-id.service';

@Module({
  imports: [UserModule, BoardModule, TaskModule],
  controllers: [AppController],
  providers: [
    Logger,
    AppService,
    PrismaService,
    RequestIdService,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
  exports: [Logger, PrismaService, RequestIdService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
