import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { UserHashPasswordPipe } from './user.hash-password.pipe';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UserHashPasswordPipe],
})
export class UserModule {}
