import { PrismaClient } from '@prisma/client';
import { inspect } from 'util';
import { seedAdmin } from './seed/admin';

const prisma = new PrismaClient({
  log: ['error', 'warn', 'info', 'query'],
  errorFormat: 'pretty',
});

async function seed(): Promise<void> {
  await seedAdmin(prisma);
  process.stdout.write('All seeding completed!\n');
}

seed()
  .catch((error: unknown) => {
    if (error instanceof Error) {
      const { message, stack } = error;
      process.stderr.write(message);
      process.stderr.write(`\n${stack ?? ''}\n`);
    } else {
      process.stderr.write(inspect(error, false, null, true));
      process.stderr.write('\n\n');
    }
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
