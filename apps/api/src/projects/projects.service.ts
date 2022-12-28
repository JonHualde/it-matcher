import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtDecodeDto } from 'src/auth/dtos/jwt-decoded.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MediaService } from 'src/media/media.service';
import { FilterProjectDto, ProjectDto } from './dtos/project.dto';
// Types
import { S3UploadResponse } from '@types';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private mediaService: MediaService,
  ) {}

  async getAllProjects(filterProjectDto?: FilterProjectDto) {
    const where = {
      projectName: { contains: filterProjectDto?.projectName } ?? {},
      isOnline: filterProjectDto?.isOnline ?? {},
      difficulty: { equals: filterProjectDto?.difficulty } ?? {},
    };

    if (filterProjectDto.jobTitle) {
      where['jobTitle'] = { hasSome: filterProjectDto?.jobTitle } ?? {};
    }

    return await this.prisma.project.findMany({
      take: 100,
      where,
      orderBy: { createdAt: filterProjectDto.orderBy ?? 'desc' },
    });
  }

  async getProjectByUserId(userId: number) {
    return await this.prisma.project.findMany({
      where: { userId },
    });
  }

  async getProjectById(id: number) {
    return await this.prisma.project.findUnique({
      where: { id },
    });
  }

  async getUserProjects(user: JwtDecodeDto) {
    return await this.prisma.project.findMany({
      where: { userId: user.id },
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

  async createNewProject(files: any, project: ProjectDto, user: JwtDecodeDto) {
    const numberOfProject = await this.prisma.project.findMany({
      where: { userId: user.id },
    });

    const duplicateProjectName = await this.prisma.project.findUnique({
      where: { projectName: project.projectName },
    });

    if (duplicateProjectName) {
      throw new ForbiddenException(
        'This project name is already taken. Please choose another one.',
      );
    }

    if (user.permission === 0 && numberOfProject.length > 3) {
      throw new ForbiddenException(
        'You cannot create more than 3 projects at the same time.',
      );
    }

    const projectPicture: S3UploadResponse[] =
      await this.mediaService.uploadMedia(files.projectPicture, 'pictures');

    const attachments: S3UploadResponse[] = await this.mediaService.uploadMedia(
      files.attachments,
      'attachments',
    );

    const attachmentsKeys: string[] = attachments.map(
      (attachment) => attachment.key,
    );

    return await this.prisma.project.create({
      data: {
        userId: user.id,
        projectName: project.projectName,
        startingOn: new Date(project.startingOn),
        estimatedTimeDuration: +project.estimatedTimeDuration,
        estimatedTimeDurationMetric: project.estimatedTimeDurationMetric,
        full_name: user.firstName + ' ' + user.lastName,
        description: project.description,
        difficulty: project.difficulty,
        type: project.type,
        numberOfParticipant: project.numberOfParticipant,
        initialInvestment: project.initialInvestment,
        initialInvestmentCost: project.initialInvestmentCost || null,
        isOnline: project.isOnline,
        toolsAndTechnologies: project.toolsAndTechnologies,
        jobTitle: project.jobTitle,
        projectPicture: projectPicture[0].key,
        attachments: attachmentsKeys,
      },
    });
  }

  async updateProject(files: any, project: ProjectDto, user: JwtDecodeDto) {
    // @TODO
    // Check if a file exists
    const existingProject = await this.prisma.project.findUniqueOrThrow({
      where: { id: project.id },
    });

    if (existingProject.userId !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to update this project.',
      );
    }

    return await this.prisma.project.update({
      where: { id: project.id },
      data: {
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
