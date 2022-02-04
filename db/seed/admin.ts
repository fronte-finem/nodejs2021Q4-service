import { PrismaClient } from '@prisma/client';
import { UserCreateDto } from '../../src/resources/user/dto/user-create.dto';
import { UserHashPasswordPipe } from '../../src/resources/user/user.hash-password.pipe';

const prisma = new PrismaClient({
  log: ['error', 'warn', 'info', 'query'],
  errorFormat: 'pretty',
});

const pipe = new UserHashPasswordPipe();

async function seed(): Promise<void> {
  const login = 'admin';
  const dto: UserCreateDto = await pipe.transform({ name: login, login, password: login });
  const admin = await prisma.user.upsert({ where: { login }, update: {}, create: dto });
  console.log('Seeding completed!\n', admin);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
