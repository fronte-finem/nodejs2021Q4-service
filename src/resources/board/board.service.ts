import { Injectable, NotFoundException } from '@nestjs/common';
import { throwExpression } from '../../common/error.helpers';
import { mapPrismaErrorToNestException } from '../../common/prisma.error';
import { PrismaService } from '../../prisma.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { ResponseBoardDto } from './dto/response-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ columns, ...boardDto }: CreateBoardDto): Promise<ResponseBoardDto> {
    try {
      return await this.prisma.board.create({
        data: { ...boardDto, columns: { create: columns } },
        include: { columns: true },
      });
    } catch (error: unknown) {
      throw mapPrismaErrorToNestException(error);
    }
  }

  async findAll(): Promise<ResponseBoardDto[]> {
    try {
      return await this.prisma.board.findMany({ include: { columns: true } });
    } catch (error: unknown) {
      throw mapPrismaErrorToNestException(error);
    }
  }

  async findOne(id: string): Promise<ResponseBoardDto> {
    let result: ResponseBoardDto | null = null;
    try {
      result = await this.prisma.board.findUnique({ where: { id }, include: { columns: true } });
    } catch (error: unknown) {
      throw mapPrismaErrorToNestException(error);
    }
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
    try {
      const [outputBoard, ...outputColumns] = await this.prisma.$transaction([
        updateBoard,
        ...updateColumns,
      ]);
      return { ...outputBoard, columns: outputColumns };
    } catch (error) {
      throw mapPrismaErrorToNestException(error);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.board.delete({ where: { id } });
    } catch (error: unknown) {
      throw mapPrismaErrorToNestException(error);
    }
  }
}
