import { Injectable, NotFoundException } from '@nestjs/common';
import { throwExpression } from '../../errors';
import { PrismaService } from '../../services/prisma.service';
import { ColumnCreateDto } from './dto/column-create.dto';
import { ColumnResponseDto } from './dto/column-response.dto';
import { ColumnUpdateDto } from './dto/column-update.dto';

@Injectable()
export class ColumnService {
  constructor(private readonly prisma: PrismaService) {}

  async create(boardId: string, columnCreateDto: ColumnCreateDto): Promise<ColumnResponseDto> {
    return this.prisma.column.create({ data: { ...columnCreateDto, boardId } });
  }

  async findAll(boardId: string): Promise<ColumnResponseDto[]> {
    return this.prisma.column.findMany({ where: { boardId } });
  }

  async findOne(boardId: string, id: string): Promise<ColumnResponseDto> {
    const result = await this.prisma.column.findUnique({ where: { id } });
    return result ?? throwExpression(new NotFoundException(`Column record #${id} not found!`));
  }

  async update(
    boardId: string,
    id: string,
    columnUpdateDto: ColumnUpdateDto
  ): Promise<ColumnResponseDto> {
    return this.prisma.column.update({ where: { id }, data: columnUpdateDto });
  }

  async remove(boardId: string, id: string): Promise<void> {
    await this.prisma.column.delete({ where: { id } });
  }
}
