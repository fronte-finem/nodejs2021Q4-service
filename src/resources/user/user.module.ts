import { Logger, Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, Logger, PrismaService],
})
export class UserModule {}
