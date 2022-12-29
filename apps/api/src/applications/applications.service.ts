import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtDecodeDto } from 'src/auth/dtos/jwt-decoded.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectService } from 'src/projects/projects.service';
import { UserService } from 'src/user/user.service';
import {
  ApplicationDto,
  StatusDto,
  UpdateApplicationDto,
} from './dtos/application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private projectService: ProjectService,
  ) {}

  async getAllApplications(status?: StatusDto) {
    const applications = await this.prisma.application.findMany({
      where: {
        ...(status ? { status: status.toString() } : {}),
      },
    });

    return applications;
  }

  async getUserApplications(user: JwtDecodeDto) {
    const applications = await this.prisma.application.findMany({
      where: { userId: user.id },
    });

    if (!applications.length) {
      return [];
    }

    const applicationsWithDetails = await Promise.all(
      applications.map(async (application) => {
        const project = await this.projectService.getProjectById(
          application.projectId,
        );

        const user = await this.userService.findById(application.userId);

        return {
          ...application,
          project: {
            projectName: project.projectName,
          },
          user: {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            github_url: user.github_url,
            linkedIn_url: user.linkedIn_url,
            instagram_username: user.instagram_username,
            website_url: user.website_url,
            notion_page_url: user.notion_page_url,
            profile_picture_ref: user.profile_picture_ref,
          },
        };
      }),
    );

    return applicationsWithDetails;
  }

  async getApplicationById(applicationId: number) {
    return await this.prisma.application.findUniqueOrThrow({
      where: { id: applicationId },
    });
  }

  async getApplicationsByProjectId(projectId: number, user: JwtDecodeDto) {
    const applications = await this.prisma.application.findMany({
      where: { projectId },
    });

    const project = await this.prisma.project.findUniqueOrThrow({
      where: { id: projectId },
    });

    if (project.userId !== user.id) {
      throw new ForbiddenException('You are not allowed to get this data.');
    }

    return applications;
  }

  async createNewApplication(application: ApplicationDto, user: JwtDecodeDto) {
    const existingApplication = await this.prisma.application.findMany({
      where: { projectId: application.projectId, userId: user.id },
    });

    if (existingApplication.length) {
      throw new ForbiddenException('You already applied to this project.');
    }

    return await this.prisma.application.create({
      data: {
        status: 'Pending',
        userId: user.id,
        projectId: application.projectId,
      },
    });
  }

  async deleteApplicationById(applicationId: number, user: JwtDecodeDto) {
    const application = await this.prisma.application.findUniqueOrThrow({
      where: { id: applicationId },
    });

    if (application.userId !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to delete this application.',
      );
    }

    return await this.prisma.application.delete({
      where: { id: applicationId },
    });
  }

  async updateApplicationStatus(
    application: UpdateApplicationDto,
    user: JwtDecodeDto,
  ) {
    // Check if the application exists, and get it
    const applicationToUpdate = await this.prisma.application.findUniqueOrThrow(
      {
        where: { id: application.id },
      },
    );

    // Take the project id, check if the project still exists, and get the project
    const project = await this.prisma.project.findUniqueOrThrow({
      where: { id: applicationToUpdate.projectId },
    });

    // Check if the id in the token matches the project owner id
    if (project.userId !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to update this application.',
      );
    }

    // if so, update the application status
    return await this.prisma.application.update({
      where: { id: application.id },
      data: {
        status: application.status,
      },
    });
  }
}
