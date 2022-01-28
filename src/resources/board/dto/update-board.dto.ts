import { UpdateColumnDto } from '../../column/dto/update-column.dto';

export class UpdateBoardDto {
  public title: string = 'Autotest';
  public columns: UpdateColumnDto[] = [];
}
