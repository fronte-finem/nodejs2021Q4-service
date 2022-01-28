import { ResponseColumnDto } from '../../column/dto/response-column.dto';

export class ResponseBoardDto {
  public id!: string;
  public title!: string;
  public columns!: ResponseColumnDto[];
}
