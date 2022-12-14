import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtDecodeDto } from 'src/auth/dtos/jwt-decoded.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectDto } from './dtos/project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async getAllProjects() {
    return await this.prisma.project.findMany({
      take: 20,
    });
  }

  async getUserProjects(user: JwtDecodeDto) {
    return await this.prisma.project.findMany({
      where: { userId: user.id },
    });
  }

  async uploadMedia(file: any, path: 'project' | 'user', userId: number) {
    // @TODO
    // Upload the file into the public folder

    // Retrieve the file reference (name with extension)
    return 'file name';
  }

  async deleteMedia(file: any, path: 'project' | 'user', userId: number) {
    // @TODO
    // Check if the file exists
    // Delete the file or throw an error
  }

  async createNewProject(files: any, project: ProjectDto, user: JwtDecodeDto) {
    const numberOfProject = await this.prisma.project.findMany({
      where: { userId: project.userId },
    });

    if (user.permission === 0 && numberOfProject.length > 3) {
      throw new ForbiddenException(
        'You cannot create more than 3 projects at the time.',
      );
    }

    // Project picture upload
    const projectPicture: string = await this.uploadMedia(
      files.projectPicture,
      'project',
      project.userId,
    );

    const attachments: string[] = [];

    // Project attachments upload
    files.attachments.forEach(async (attachment: any) => {
      attachments.push(
        await this.uploadMedia(attachment, 'project', project.userId),
      );
    });

    // Create project
    return await this.prisma.project.create({
      data: {
        userId: project.userId,
        projectName: project.projectName,
        startingOn: project.startingOn,
        estimatedTimeDuration: project.estimatedTimeDuration,
        estimatedTimeDurationMetric: project.estimatedTimeDurationMetric,
        description: project.description,
        difficulty: project.difficulty,
        type: project.type,
        numberOfParticipant: project.numberOfParticipant,
        initialInvestment: project.initialInvestment,
        initialInvestmentCost: project.initialInvestmentCost || null,
        isOnline: project.isOnline,
        toolsAndTechnologies: project.toolsAndTechnologies,
        jobTitle: project.jobTitle,
        projectPicture,
        attachments,
      },
    });
  }

  async delete(projectId: number, user: JwtDecodeDto) {
    const project = await this.prisma.project.findUniqueOrThrow({
      where: { id: projectId },
    });

    if (project.userId !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to delete this project.',
      );
    }
    await this.prisma.project.delete({
      where: { id: projectId },
    });

    return project;
  }

  async updateProject(files: any, project: ProjectDto, user: JwtDecodeDto) {
    // @TODO
    // Check if a file exists
    await this.prisma.project.findUniqueOrThrow({
      where: { id: project.id },
    });

    if (project.userId !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to update this project.',
      );
    }

    return await this.prisma.project.update({
      where: { id: project.id },
      data: {
        userId: project.userId,
        projectName: project.projectName,
        startingOn: project.startingOn,
        estimatedTimeDuration: project.estimatedTimeDuration,
        estimatedTimeDurationMetric: project.estimatedTimeDurationMetric,
        description: project.description,
        difficulty: project.difficulty,
        type: project.type,
        numberOfParticipant: project.numberOfParticipant,
        initialInvestment: project.initialInvestment,
        initialInvestmentCost: project.initialInvestmentCost || null,
        isOnline: project.isOnline,
        toolsAndTechnologies: project.toolsAndTechnologies,
        jobTitle: project.jobTitle,
        // projectPicture,
        // attachments,
      },
    });
  }
}
