import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { throwExpression } from '../../errors';
import { PrismaService } from '../../prisma/prisma.service';
import { ColumnResponseDto } from '../column/dto/column-response.dto';
import { ColumnUpdateDto } from '../column/dto/column-update.dto';
import { BoardCreateDto } from './dto/board-create.dto';
import { BoardResponseDto } from './dto/board-response.dto';
import { BoardUpdateDto } from './dto/board-update.dto';

const throwBoardNotFound = (id: string) =>
  throwExpression(new NotFoundException(`Board [${id}] not found!`));

@Injectable()
export class BoardService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ columns, ...boardDto }: BoardCreateDto): Promise<BoardResponseDto> {
    return this.prisma.board.create({
      data: { ...boardDto, columns: { create: columns } },
      include: { columns: true },
    });
  }

  async findAll(): Promise<BoardResponseDto[]> {
    return this.prisma.board.findMany({ include: { columns: true } });
  }

  async findOne(id: string): Promise<BoardResponseDto> {
    const result = await this.prisma.board.findUnique({
      where: { id },
      include: { columns: true },
    });
    return result ?? throwBoardNotFound(id);
  }

  async exists(id: string): Promise<{ id: string }> {
    const result = await this.prisma.board.findUnique({
      where: { id },
      select: { id: true },
    });
    return result ?? throwBoardNotFound(id);
  }

  async update(
    id: string,
    { columns: inputColumns, ...inputBoard }: BoardUpdateDto
  ): Promise<BoardResponseDto> {
    await this.exists(id);
    if (!inputColumns) {
      return this.updateBoard(id, inputBoard, true);
    }
    const updateBoard = this.updateBoard(id, inputBoard);
    const updateColumns = this.updateColumns(inputColumns);
    const [board, ...columns] = await this.prisma.$transaction([updateBoard, ...updateColumns]);
    return { ...board, columns };
  }

  async remove(id: string): Promise<void> {
    await this.exists(id);
    await this.prisma.board.delete({ where: { id } });
  }

  private updateBoard(
    id: string,
    data: BoardUpdateDto,
    includeColumns = false
  ): Prisma.Prisma__BoardClient<BoardResponseDto> {
    return this.prisma.board.update({
      where: { id },
      data,
      include: { columns: includeColumns },
    });
  }

  private updateColumns(
    inputColumns: ColumnUpdateDto[]
  ): Prisma.Prisma__ColumnClient<ColumnResponseDto>[] {
    return inputColumns.map(({ id, ...data }) =>
      this.prisma.column.upsert({ where: { id }, create: data, update: data })
    );
  }
}
