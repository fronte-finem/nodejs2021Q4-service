export class Task {
  public id!: string;
  public title!: string;
  public order!: number;
  public description!: string;
  public userId?: string | null;
  public boardId?: string | null;
  public columnId?: string | null;
}
