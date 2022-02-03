import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggingInterceptor } from './interceptors/logging-interceptor.service';
import { loggerConfig } from './logger/logger.config';
import { LoggerModule } from './logger/logger.module';
import { LoggingMiddleware } from './middlewares/logging-middleware.service';
import { BoardModule } from './resources/board/board.module';
import { ColumnModule } from './resources/column/column.module';
import { TaskModule } from './resources/task/task.module';
import { UserModule } from './resources/user/user.module';
import { PrismaService } from './services/prisma.service';
import { RequestIdService } from './services/request-id.service';

@Module({
  imports: [LoggerModule.forRoot(loggerConfig), UserModule, BoardModule, ColumnModule, TaskModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    RequestIdService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
  exports: [PrismaService, RequestIdService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
