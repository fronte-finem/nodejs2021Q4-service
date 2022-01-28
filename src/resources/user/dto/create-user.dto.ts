export class CreateUserDto {
  name!: string;
  login: string = 'user';
  password: string = 'P@55w0rd';
}
