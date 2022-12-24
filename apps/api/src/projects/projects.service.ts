import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtDecodeDto } from 'src/auth/dtos/jwt-decoded.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterProjectDto, ProjectDto } from './dtos/project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async getAllProjects(filterProjectDto?: FilterProjectDto) {
    return await this.prisma.project.findMany({
      take: 100,
      where: {
        projectName: { contains: filterProjectDto?.projectName } ?? {},
        jobTitle: { hasSome: filterProjectDto?.jobTitle } ?? {},
        isOnline: filterProjectDto?.isOnline ?? {},
        difficulty: { equals: filterProjectDto?.difficulty } ?? {},
      },
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

  async deleteMedia(file: any, type: 'picture' | 'attachment', userId: number) {
    // @TODO
    // Check if the file exists
    // Delete the file or throw an error
    // @FROM CHATGPT --> Local file deletion
    //     const fs = require('fs');
    // function deleteImage(filePath) {
    //   // Delete the local file
    //   fs.unlink(filePath, (error) => {
    //     if (error) {
    //       console.error(`Error deleting image: ${error}`);
    //     } else {
    //       console.log('Image successfully deleted.');
    //     }
    //   });
    // }
    // @FROM CHATGPT --> Remove server image deletion
    //     const fs = require('fs');
    // const request = require('request');
    // function deleteImage(imageUrl) {
    //   // Retrieve the image from the server using the URL
    //   request.get(imageUrl, (error, response, body) => {
    //     if (error) {
    //       console.error(`Error retrieving image: ${error}`);
    //       return;
    //     }
    //     // Save the image to a local file
    //     const filePath = './image.jpg';
    //     fs.writeFileSync(filePath, body);
    //     // Delete the local file
    //     fs.unlink(filePath, (error) => {
    //       if (error) {
    //         console.error(`Error deleting image: ${error}`);
    //       } else {
    //         console.log('Image successfully deleted.');
    //       }
    //     });
    //   });
    // }
  }

  async createNewProject(files: any, project: ProjectDto, user: JwtDecodeDto) {
    console.log('project', project);
    console.log('files', files);

    const numberOfProject = await this.prisma.project.findMany({
      where: { userId: user.id },
    });

    if (user.permission === 0 && numberOfProject.length > 3) {
      throw new ForbiddenException(
        'You cannot create more than 3 projects at the time.',
      );
    }

    const attachments: string[] = [];

    if (files.attachments) {
      files.attachments.forEach((file: any) => {
        attachments.push(file.updatedFilename);
      });
    }
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
        projectPicture: files.projectPicture[0].filename,
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
