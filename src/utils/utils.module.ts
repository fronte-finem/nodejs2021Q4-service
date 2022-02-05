import { Global, Module } from '@nestjs/common';
import { RequestIdService } from './request-id.service';

@Global()
@Module({
  providers: [RequestIdService],
  exports: [RequestIdService],
})
export class UtilsModule {}
