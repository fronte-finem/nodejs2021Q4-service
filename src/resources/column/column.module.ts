import { Logger, Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';

@Module({
  controllers: [ColumnController],
  providers: [ColumnService, Logger, PrismaService],
})
export class ColumnModule {}
