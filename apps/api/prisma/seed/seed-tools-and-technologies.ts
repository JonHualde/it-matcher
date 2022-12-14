import { PrismaClient } from '@prisma/client';

// Data
import toolsAndTechnologiesData from '../toolsAndtechnologiesData';

// Prisma
const prisma = new PrismaClient();

const run = async () => {
  await Promise.all(
    toolsAndTechnologiesData.map(async (tools) => {
      return await prisma.tools_and_technologie.create({
        data: {
          name: tools.name,
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
