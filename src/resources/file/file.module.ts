import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { DynamicFileInterceptor } from './utils/dynamic.file.interceptor';

@Module({
  controllers: [FileController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DynamicFileInterceptor,
    },
    FileService,
  ],
})
export class FileModule {}
