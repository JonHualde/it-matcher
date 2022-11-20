import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// Data
import userData from "./userData";
import projectData from "./projectsData";
import applicationsData from "./applicationsData";
import favouritesData from "./favouritesData";

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
          password: bcrypt.hashSync("password", salt),
          first_name: user.firstName,
          last_name: user.lastName,
          linkedIn_url: user.linkedInUrl,
          instagram_username: user.instagramUsername,
          website_url: user.websiteUrl,
          notion_page_url: user.notionPageUrl,
          permission: user.Permission,
          profile_picture_ref: "",
        },
      });
    })
  );

  // 2) Generating projects
  await Promise.all(
    projectData.map(async (project) => {
      return prisma.project.create({
        data: {
          User: {
            connect: { id: project.userId },
          },
          mainPicture: project.mainPicture,
          projectName: project.projectName,
          startingOn: project.startingOn,
          estimatedTimeDuration: project.estimatedTimeDuration,
          estimatedTimeDurationMetric: project.estimatedTimeDurationMetric,
          description: project.description,
          difficulty: project.difficulty,
          type: project.type,
          searchingFor: project.searchingFor,
          numberOfParticipant: project.numberOfParticipant,
          initialInvestment: project.initialInvestment,
          initialInvestmentCost: project.initialInvestmentCost,
          toolsAndTechnologies: project.toolsAndTechnologies,
          putOnline: true,
        },
      });
    })
  );

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
    })
  );

  // 4) Generating favourites
  await Promise.all(
    favouritesData.map(async (favourite) => {
      const user = await prisma.favourite.findFirst({
        where: { userId: favourite.userId },
      });

      if (!user) {
        return prisma.favourite.create({
          data: {
            user: {
              connect: { id: favourite.userId },
            },
            projectIds: favourite.projectIds,
          },
        });
      }
    })
  );
};

run()
  .catch((err) => {
    console.log("err:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
