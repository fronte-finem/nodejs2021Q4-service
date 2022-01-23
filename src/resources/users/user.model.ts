import 'reflect-metadata';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskDTO, UserDTO, UserDTOResponse } from '../dto-types';

@Entity()
export class User implements UserDTO {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public name: string;

  @Column()
  public login: string;

  @Column()
  public password: string;

  @OneToMany('Task', 'user', { cascade: true })
  public tasks?: TaskDTO[];

  constructor({ name, login, password }: Partial<UserDTO> = {}) {
    this.name = name ?? 'User Name';
    this.login = login ?? 'user';
    this.password = password ?? 'P@55w0rd';
  }

  public static toResponse({ id, name, login }: User): UserDTOResponse {
    return { id, name, login };
  }
}
