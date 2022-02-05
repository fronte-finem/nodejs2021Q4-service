import { Module } from '@nestjs/common';
import { UserHashPasswordPipe } from './user.hash-password.pipe';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, UserHashPasswordPipe],
  exports: [UserService],
})
export class UserModule {}
