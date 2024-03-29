import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Data
import favouritesData from '../favouritesData';

// Prisma
const prisma = new PrismaClient();

const run = async () => {
  const salt = bcrypt.genSaltSync();

  // 4) Generating favourites
  await Promise.all(
    favouritesData.map(async (favourite) => {
      const user = await prisma.favourite.findFirst({
        where: { user_id: favourite.user_id },
      });

      if (!user) {
        return prisma.favourite.create({
          data: {
            user: {
              connect: { id: favourite.user_id },
            },
            project: {
              connect: { id: favourite.project_id },
            },
          },
        });
      }
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
