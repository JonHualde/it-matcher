import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// Data
import projectData from "../projectsData";

// Prisma
const prisma = new PrismaClient();

const run = async () => {
  const salt = bcrypt.genSaltSync();

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
};

run()
  .catch((err) => {
    console.log("err:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
