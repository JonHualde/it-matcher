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
          project_main_picture: project.projectPicture,
          project_name: project.projectName,
          starting_on: project.startingOn,
          estimated_time_duration: project.estimatedTimeDuration,
          estimated_time_duration_metric: project.estimatedTimeDurationMetric,
          description: project.description,
          difficulty: project.difficulty,
          full_name: project.full_name,
          type: project.type,
          number_of_participants: project.numberOfParticipant,
          initial_investment: project.initialInvestment,
          initial_investment_cost: project.initialInvestmentCost,
          is_online: true,
          tools_and_technologies: project.toolsAndTechnologies,
          job_titles_wanted: project.jobTitle,
          attachments: project.attachments,
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
