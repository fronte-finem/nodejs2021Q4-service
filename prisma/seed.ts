import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './seed/admin';

const prisma = new PrismaClient({
  log: ['error', 'warn', 'info', 'query'],
  errorFormat: 'pretty',
});

async function seed(): Promise<void> {
  await seedAdmin(prisma);
  console.log('All seeding completed!');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
