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

  async getSentApplications(user: JwtDecodeDto) {
    const applicationsSent = await this.prisma.application.findMany({
      where: { userId: user.id },
    });

    if (!applicationsSent.length) {
      return [];
    }

    // Get project details for each application sent
    return await Promise.all(
      applicationsSent.map(async (application) => {
        const project = await this.projectService.getProjectById(
          application.projectId,
        );

        return {
          ...application,
          project,
        };
      }),
    );
  }

  async getReceivedApplications(user: JwtDecodeDto) {
    const userProjects = await this.prisma.project.findMany({
      where: { userId: user.id },
    });

    // Get applications received by user's projects
    const applicationsReceived = await this.prisma.application.findMany({
      where: {
        projectId: {
          in: userProjects.map((project) => project.id),
        },
      },
    });

    if (!applicationsReceived.length) {
      return [];
    }

    // Add project name to each application received
    applicationsReceived.forEach((application: any) => {
      const project = userProjects.find(
        (project) => project.id === application.projectId,
      );

      application.project = project;
    });

    // Get user details for each application received
    return await Promise.all(
      applicationsReceived.map(async (application) => {
        const user = await this.userService.findById(
          application && application.userId,
        );

        return {
          ...application,
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
