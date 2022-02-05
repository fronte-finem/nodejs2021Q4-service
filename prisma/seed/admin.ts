import { PrismaClient } from '@prisma/client';
import { UserCreateDto } from '../../src/resources/user/dto/user-create.dto';
import { UserHashPasswordPipe } from '../../src/resources/user/user.hash-password.pipe';

export async function seedAdmin(prisma: PrismaClient): Promise<void> {
  const pipe = new UserHashPasswordPipe();
  const login = 'admin';
  const dto: UserCreateDto = await pipe.transform({ name: login, login, password: login });
  await prisma.user.upsert({ where: { login }, update: {}, create: dto });
  process.stdout.write('Seeding "admin" successfully completed!\n');
}
