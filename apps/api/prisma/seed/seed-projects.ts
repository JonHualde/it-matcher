import { PrismaClient } from '@prisma/client';

// Data
import projectData from '../projectsData';

// Prisma
const prisma = new PrismaClient();

const run = async () => {
  // 2) Generating projects
  await Promise.all(
    projectData.map(async (project) => {
      return prisma.project.create({
        data: {
          User: {
            connect: { id: project.userId },
          },
          projectPicture: project.projectPicture,
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
          isOnline: true,
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
