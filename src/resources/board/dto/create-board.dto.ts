import { CreateColumnDto } from '../../column/dto/create-column.dto';

export class CreateBoardDto {
  public title: string = 'Autotest';
  public columns: CreateColumnDto[] = [];
}
