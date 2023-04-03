import { PrismaClient } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcryptjs';

// Data
import userData from './userData';
import projectData from './projectsData';
import applicationsData from './applicationsData';
import favouritesData from './favouritesData';
import jobTitlesData from './jobTitlesData';
import toolsAndTechnologiesData from './toolsAndtechnologiesData';

// Prisma
const prisma = new PrismaClient();

const run = async () => {
  const salt = genSaltSync();

  // 1) Generating users
  await Promise.all(
    userData.map(async (user) => {
      return await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          email: user.email,
          password: hashSync('password', salt),
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

  // 2) Generating projects
  await Promise.all(
    projectData.map(async (project) => {
      return await prisma.project.create({
        data: {
          user: {
            connect: { id: project.user_id },
          },
          project_name: project.project_name,
          starting_on: project.starting_on,
          estimated_time_duration: project.estimated_time_duration,
          estimated_time_duration_metric:
            project.estimated_time_duration_metric,
          full_name: project.full_name,
          description: project.description,
          difficulty: project.difficulty,
          type: project.type,
          is_online: project.is_online,
          number_of_participants: project.number_of_participants,
          initial_investment: project.initial_investment,
          initial_investment_cost: project.initial_investment_cost,
          tools_and_technologies: project.tools_and_technologies,
          job_titles_wanted: project.job_titles_wanted,
          project_main_picture: project.project_main_picture,
          attachments: project.attachments,
        },
      });
    }),
  );

  // 3) Generating applications
  await Promise.all(
    applicationsData.map(async (application) => {
      return await prisma.application.create({
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

  // 4) Generating favourites
  await Promise.all(
    favouritesData.map(async (favourite) => {
      const user = await prisma.favourite.findFirst({
        where: { user_id: favourite.userId },
      });

      if (!user) {
        return await prisma.favourite.create({
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

  // 5) Creating jobs
  await Promise.all(
    jobTitlesData.map(async (job) => {
      return await prisma.job_title.create({
        data: {
          name: job.name,
        },
      });
    }),
  );

  // 6) Creating tools and technologies
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
