import { PrismaClient } from '@prisma/client';

// Data
import applicationsData from '../applicationsData';

// Prisma
const prisma = new PrismaClient();

const run = async () => {
  // 3) Generating applications
  await Promise.all(
    applicationsData.map(async (application) => {
      return prisma.application.create({
        data: {
          user: {
            connect: { id: application.user_id },
          },
          project: {
            connect: { id: application.project_id },
          },
          status: application.status,
          job_title_id: application.job_title_id,
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
