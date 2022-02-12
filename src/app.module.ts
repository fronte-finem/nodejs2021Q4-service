import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfigModule } from './config/env.config.module';
import { loggerConfig } from './logger/logger.config';
import { LoggerModule } from './logger/logger.module';
import { UtilsModule } from './utils/utils.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './resources/login/login.module';
import { UserModule } from './resources/user/user.module';
import { FileModule } from './resources/file/file.module';
import { BoardModule } from './resources/board/board.module';
import { ColumnModule } from './resources/column/column.module';
import { TaskModule } from './resources/task/task.module';

@Module({
  imports: [
    EnvConfigModule,
    LoggerModule.forRoot(loggerConfig),
    UtilsModule,
    PrismaModule,
    AuthModule,
    LoginModule,
    FileModule,
    UserModule,
    BoardModule,
    ColumnModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
