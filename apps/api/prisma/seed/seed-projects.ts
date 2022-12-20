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
          user: {
            connect: { id: project.userId },
          },
          projectPicture: project.projectPicture,
          projectName: project.projectName,
          startingOn: project.startingOn,
          estimatedTimeDuration: project.estimatedTimeDuration,
          estimatedTimeDurationMetric: project.estimatedTimeDurationMetric,
          description: project.description,
          difficulty: project.difficulty,
          full_name: project.full_name,
          type: project.type,
          numberOfParticipant: project.numberOfParticipant,
          initialInvestment: project.initialInvestment,
          initialInvestmentCost: project.initialInvestmentCost,
          isOnline: true,
          toolsAndTechnologies: project.toolsAndTechnologies,
          jobTitle: project.jobTitle,
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
