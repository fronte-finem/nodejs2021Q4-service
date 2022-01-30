import 'reflect-metadata';
import bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SALT_ROUNDS } from '../../common/config';
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

  @BeforeInsert()
  public async hashPassword(password?: string): Promise<void> {
    this.password = await bcrypt.hash(password ?? this.password, SALT_ROUNDS);
  }

  public static toResponse({ id, name, login }: User): UserDTOResponse {
    return { id, name, login };
  }
}
