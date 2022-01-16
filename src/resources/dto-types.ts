export interface UserDTO {
  id?: string;
  name: string;
  login: string;
  password: string;
}

export type UserDTOResponse = Omit<UserDTO, 'password'>;

export interface BoardDTO {
  id?: string;
  title: string;
  columns: ColumnDTO[];
}

export interface ColumnDTO {
  id?: string;
  title: string;
  order: number;
  board?: BoardDTO;
}

export interface TaskDTO {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: null | string;
  boardId: null | string;
  columnId: null | string;
}
