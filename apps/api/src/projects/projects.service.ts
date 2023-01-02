import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtDecodeDto } from 'src/auth/dtos/jwt-decoded.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MediaService } from 'src/media/media.service';
// Types
import { S3UploadResponse } from '@types';
// dtos
import { FilterProjectDto, ProjectDto } from './dtos/project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private mediaService: MediaService,
  ) {}

  async getAllProjects(filterProjectDto?: FilterProjectDto) {
    const where = {
      project_name: { contains: filterProjectDto?.project_name } ?? {},
      is_online: filterProjectDto?.isOnline ?? {},
      difficulty: { equals: filterProjectDto?.difficulty } ?? {},
    };

    if (filterProjectDto.jobTitle) {
      where['job_titles_wanted'] =
        { hasSome: filterProjectDto?.jobTitle } ?? {};
    }

    return await this.prisma.project.findMany({
      take: 100,
      where,
      orderBy: { created_at: filterProjectDto.orderBy ?? 'desc' },
    });
  }

  async getProjectByUserId(user_id: number) {
    return await this.prisma.project.findMany({
      where: { user_id },
    });
  }

  async getProjectById(id: number) {
    return await this.prisma.project.findUnique({
      where: { id },
    });
  }

  async getUserProjects(user: JwtDecodeDto) {
    return await this.prisma.project.findMany({
      where: { user_id: user.id },
    });
  }

  async delete(project_id: number, user: JwtDecodeDto) {
    const project = await this.prisma.project.findUniqueOrThrow({
      where: { id: project_id },
    });

    if (project.user_id !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to delete this project.',
      );
    }
    await this.prisma.project.delete({
      where: { id: project_id },
    });

    return project;
  }

  async createNewProject(files: any, project: ProjectDto, user: JwtDecodeDto) {
    const numberOfProject = await this.prisma.project.findMany({
      where: { user_id: user.id },
    });

    const duplicateproject_name = await this.prisma.project.findUnique({
      where: { project_name: project.project_name.trim() },
    });

    if (duplicateproject_name) {
      throw new ForbiddenException(
        'This project name is already taken. Please choose another one.',
      );
    }

    if (user.permission === 0 && numberOfProject.length > 3) {
      throw new ForbiddenException(
        'You cannot create more than 3 projects at the same time.',
      );
    }

    // Upload files to S3
    const projectPicture: S3UploadResponse[] =
      await this.mediaService.uploadMedia(
        files.project_main_picture,
        'pictures',
      );
    const attachments: S3UploadResponse[] = await this.mediaService.uploadMedia(
      files.attachments,
      'attachments',
    );

    const attachmentsKeys: string[] = attachments.map(
      (attachment) => attachment.key,
    );

    return await this.prisma.project.create({
      data: {
        user_id: user.id,
        project_name: project.project_name.trim(),
        starting_on: new Date(project.starting_on),
        estimated_time_duration: +project.estimated_time_duration,
        estimated_time_duration_metric: project.estimated_time_duration_metric,
        full_name: user.firstName + ' ' + user.lastName,
        description: project.description.trim(),
        difficulty: project.difficulty,
        type: project.type,
        number_of_participants: project.job_titles_wanted.length,
        initial_investment: project.initial_investment,
        initial_investment_cost: project.initial_investment_cost || null,
        is_online: project.is_online,
        tools_and_technologies: project.tools_and_technologies,
        participants_ids: [],
        job_titles_filled: [],
        job_titles_wanted: project.job_titles_wanted,
        project_main_picture: projectPicture[0].key,
        attachments: attachmentsKeys,
      },
    });
  }

  async updateProject(
    files: any,
    project: UpdateProjectDto,
    user: JwtDecodeDto,
  ) {
    // Check if a file exists
    const projectToUpdate = await this.prisma.project.findUniqueOrThrow({
      where: { id: project.id },
    });

    if (projectToUpdate.user_id !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to update this project.',
      );
    }

    if (projectToUpdate.project_name.trim() === project.project_name.trim()) {
      throw new ForbiddenException(
        'This project name is already taken. Please choose another one.',
      );
    }

    // Get current project picture and attachments references
    const currentProjectPicture = projectToUpdate.project_main_picture;
    const currentAttachments = projectToUpdate.attachments;

    console.log(
      'ATTACHMENTTTT',
      files.attachments,
      currentAttachments,
      project.attachments,
    );

    // if (
    //   currentAttachments.length !== project.attachments.length &&
    //   currentAttachments.length > 0
    // ) {
    //   if (!project.attachments) {
    //     // Delete all attachments
    //     currentAttachments.forEach(async (key: string) => {
    //       await this.mediaService.deleteMedia(key);
    //     });
    //   } else {
    //     // Return an array of the attachments to delete
    //     const attachmentsToDelete = currentAttachments.filter((attachment) => {
    //       return !project.attachments.includes(attachment);
    //     });

    //     // Delete the attachments
    //     attachmentsToDelete.forEach(async (key: string) => {
    //       await this.mediaService.deleteMedia(key);
    //     });
    //     console.log('DELETE', attachmentsToDelete);
    //   }
    // }

    return 'hey';

    if (files.project_main_picture) {
      // Delete the existing picture
      await this.mediaService.deleteMedia(currentProjectPicture);
      // Upload new picture
      const projectPicture: S3UploadResponse[] =
        await this.mediaService.uploadMedia(
          files.project_main_picture,
          'pictures',
        );
    }

    return await this.prisma.project.update({
      where: { id: project.id },
      data: {
        project_name: project.project_name,
        starting_on: project.starting_on,
        estimated_time_duration: project.estimated_time_duration,
        estimated_time_duration_metric: project.estimated_time_duration_metric,
        description: project.description,
        difficulty: project.difficulty,
        type: project.type,
        initial_investment: project.initial_investment,
        initial_investment_cost: project.initial_investment_cost || null,
        is_online: project.is_online,
        tools_and_technologies: project.tools_and_technologies,
        job_titles_wanted: project.job_titles_wanted,
        // projectPicture,
        // attachments,
      },
    });
  }
}
