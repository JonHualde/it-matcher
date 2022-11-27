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
          Applicant: {
            connect: { id: application.applicantId },
          },
          Project: {
            connect: { id: application.projectId },
          },
          status: application.status,
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
