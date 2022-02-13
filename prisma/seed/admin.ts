import { PrismaClient } from '@prisma/client';
import { envVars } from '../../src/config/env.validation';
import { UserCreateDto } from '../../src/resources/user/dto/user-create.dto';
import { hashPassword } from '../../src/resources/user/user.hash-password.pipe';

export async function seedAdmin(prisma: PrismaClient): Promise<void> {
  const login = 'admin';
  const userDto: UserCreateDto = await hashPassword(envVars.BCRYPT_HASH_ROUNDS, {
    name: login,
    login,
    password: login,
  });
  await prisma.user.upsert({ where: { login }, update: {}, create: userDto });
  process.stdout.write('Seeding "admin" successfully completed!\n');
}
