import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Data
import userData from '../userData';

// Prisma
const prisma = new PrismaClient();

const run = async () => {
  const salt = bcrypt.genSaltSync();

  // 1) Generating users
  await Promise.all(
    userData.map(async (user) => {
      return prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          email: user.email,
          password: bcrypt.hashSync('password', salt),
          first_name: user.firstName,
          last_name: user.lastName,
          linkedIn_url: user.linkedInUrl,
          instagram_username: user.instagramUsername,
          website_url: user.websiteUrl,
          notion_page_url: user.notionPageUrl,
          permission: user.permission,
          profile_picture_ref: user.profile_picture_ref,
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
