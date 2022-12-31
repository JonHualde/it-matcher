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
// types
import {
  GetUserReceivedApplicationsResponse,
  UserSentApplicationsResponse,
  ProjectTypes,
  ApplicationTypes,
  User,
} from '@shared-types';

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

  async getSentApplications(
    user: JwtDecodeDto,
  ): Promise<UserSentApplicationsResponse[]> {
    const applicationsSent = await this.prisma.application.findMany({
      where: { userId: user.id },
    });

    if (!applicationsSent.length) {
      return [];
    }

    const projects: ProjectTypes[] = await Promise.all(
      applicationsSent.map(async (application) => {
        const project = await this.projectService.getProjectById(
          application.projectId,
        );

        return project;
      }),
    );

    // Add project to each application in a new variable called result
    const result: UserSentApplicationsResponse[] = applicationsSent.map(
      (application) => {
        const project = projects.find(
          (project) => project.id === application.projectId,
        );

        return {
          ...application,
          status: application.status as 'Accepted' | 'Pending' | 'Rejected',
          project,
        };
      },
    );

    return result;
  }

  async getReceivedApplications(
    user: JwtDecodeDto,
  ): Promise<GetUserReceivedApplicationsResponse[]> {
    // Get user's projects
    const userProjects: ProjectTypes[] = await this.prisma.project.findMany({
      where: { userId: user.id },
    });

    // Get applications received by user's projects
    const applicationsReceived: ApplicationTypes[] =
      await this.prisma.application.findMany({
        where: {
          projectId: {
            in: userProjects.map((project) => project.id),
          },
        },
      });

    if (!applicationsReceived.length) {
      return [];
    }

    // Get applicants' details of applicants who applied to user's projects
    const users: User[] = await Promise.all(
      applicationsReceived.map(async (application) => {
        const user = await this.userService.findById(
          application && application.userId,
        );

        return user;
      }),
    );

    // Add project and user details to each application in a new variable called result
    const result: GetUserReceivedApplicationsResponse[] =
      applicationsReceived.map((application) => {
        const user = users.find((user) => user.id === application.userId);

        const project = userProjects.find(
          (project) => project.id === application.projectId,
        );

        return {
          ...application,
          status: application.status as 'Accepted' | 'Pending' | 'Rejected',
          project,
          user: {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            linkedIn_url: user.linkedIn_url,
            instagram_username: user.instagram_username,
            github_url: user.github_url,
            website_url: user.website_url,
            notion_page_url: user.notion_page_url,
            profile_picture_ref: user.profile_picture_ref,
          },
        };
      });

    return result;
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

  async createNewApplication(
    application: ApplicationDto,
    user: JwtDecodeDto,
  ): Promise<UserSentApplicationsResponse> {
    const existingApplication: ApplicationTypes[] =
      await this.prisma.application.findMany({
        where: { projectId: application.projectId, userId: user.id },
      });

    if (existingApplication.length) {
      throw new ForbiddenException('You already applied to this project.');
    }

    const newApplication: ApplicationTypes =
      await this.prisma.application.create({
        data: {
          status: 'Pending',
          userId: user.id,
          projectId: application.projectId,
        },
      });

    const project: ProjectTypes = await this.projectService.getProjectById(
      newApplication.projectId,
    );

    return {
      ...newApplication,
      status: newApplication.status as 'Accepted' | 'Pending' | 'Rejected',
      project,
    };
  }

  async deleteApplicationById(
    applicationId: number,
    user: JwtDecodeDto,
  ): Promise<ApplicationTypes> {
    const application: ApplicationTypes =
      await this.prisma.application.findUniqueOrThrow({
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
