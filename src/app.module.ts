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
import { AuthModule } from './auth/auth.module';
import { FileModule } from './resources/file/file.module';
import { LoginModule } from './resources/login/login.module';
import { PrismaModule } from './prisma/prisma.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    LoggerModule.forRoot(loggerConfig),
    PrismaModule,
    AuthModule,
    LoginModule,
    FileModule,
    UserModule,
    BoardModule,
    ColumnModule,
    TaskModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
