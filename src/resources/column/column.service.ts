import { Injectable, NotFoundException } from '@nestjs/common';
import { throwExpression } from '../../errors';
import { PrismaService } from '../../prisma/prisma.service';
import { ColumnCreateDto } from './dto/column-create.dto';
import { ColumnResponseDto } from './dto/column-response.dto';
import { ColumnUpdateDto } from './dto/column-update.dto';

const throwColumnNotFound = (id: string, boardId: string) =>
  throwExpression(new NotFoundException(`Column [${id}] for board [${boardId}] not found!`));

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
    const result = await this.prisma.column.findFirst({ where: { id, boardId } });
    return result ?? throwColumnNotFound(id, boardId);
  }

  async exists(boardId: string, id: string): Promise<{ id: string }> {
    const result = await this.prisma.column.findFirst({
      where: { id, boardId },
      select: { id: true },
    });
    return result ?? throwColumnNotFound(id, boardId);
  }

  async update(
    boardId: string,
    id: string,
    columnUpdateDto: ColumnUpdateDto
  ): Promise<ColumnResponseDto> {
    await this.exists(boardId, id);
    return this.prisma.column.update({ where: { id }, data: columnUpdateDto });
  }

  async remove(boardId: string, id: string): Promise<void> {
    await this.exists(boardId, id);
    await this.prisma.column.delete({ where: { id } });
  }
}
