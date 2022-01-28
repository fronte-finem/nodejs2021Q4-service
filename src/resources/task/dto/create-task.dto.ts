export class CreateTaskDto {
  title: string = 'Test Task';
  order: number = 1;
  description: string = 'Lorem ipsum';
  userId?: string | null = null;
  boardId?: string | null = null;
  columnId?: string | null = null;
}
