import { PrismaClient } from '@prisma/client';

// Data
import jobTitlesData from '../jobTitlesData';

// Prisma
const prisma = new PrismaClient();

const run = async () => {
  await Promise.all(
    jobTitlesData.map(async (job) => {
      return await prisma.job_title.create({
        data: {
          name: job.name,
        },
      });
    }),
  );
};

run()
  .catch((err) => {
    console.log('err:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
