import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserDTO } from '../resources/dto-types';
import { User } from '../resources/users/user.model';

const ADMIN: UserDTO = {
  name: 'Admin',
  login: 'admin',
  password: 'admin',
};

export class SeedAdmin1642601972785 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const admin = new User(ADMIN);
    await queryRunner.manager.insert(User, admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const { name, login } = ADMIN;
    await queryRunner.manager.delete(User, { name, login });
  }
}
