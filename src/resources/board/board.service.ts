import { Injectable, NotFoundException } from '@nestjs/common';
import { throwExpression } from '../../errors';
import { PrismaService } from '../../prisma.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { ResponseBoardDto } from './dto/response-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ columns, ...boardDto }: CreateBoardDto): Promise<ResponseBoardDto> {
    return this.prisma.board.create({
      data: { ...boardDto, columns: { create: columns } },
      include: { columns: true },
    });
  }

  async findAll(): Promise<ResponseBoardDto[]> {
    return this.prisma.board.findMany({ include: { columns: true } });
  }

  async findOne(id: string): Promise<ResponseBoardDto> {
    const result = await this.prisma.board.findUnique({
      where: { id },
      include: { columns: true },
    });
    return result ?? throwExpression(new NotFoundException(`Board record #${id} not found!`));
  }

  async update(
    id: string,
    { columns: inputColumns, ...inputBoard }: UpdateBoardDto
  ): Promise<ResponseBoardDto> {
    const updateBoard = this.prisma.board.update({ where: { id }, data: inputBoard });
    const updateColumns = inputColumns.map(({ id: columnId, ...data }) =>
      this.prisma.column.upsert({ where: { id: columnId }, create: data, update: data })
    );
    const [outputBoard, ...outputColumns] = await this.prisma.$transaction([
      updateBoard,
      ...updateColumns,
    ]);
    return { ...outputBoard, columns: outputColumns };
  }

  async remove(id: string): Promise<void> {
    await this.prisma.board.delete({ where: { id } });
  }
}
