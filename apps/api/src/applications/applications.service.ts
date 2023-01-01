import {
  NotFoundException,
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
    const applicationsSent: ApplicationTypes[] =
      await this.prisma.application.findMany({
        where: { user_id: user.id },
      });

    if (!applicationsSent.length) {
      return [];
    }

    const projects: ProjectTypes[] = await Promise.all(
      applicationsSent.map(async (application) => {
        const project = await this.projectService.getProjectById(
          application.project_id,
        );

        return project;
      }),
    );

    // Add project to each application in a new variable called result
    const result: UserSentApplicationsResponse[] = applicationsSent.map(
      (application) => {
        const project = projects.find(
          (project) => project.id === application.project_id,
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
      where: { user_id: user.id },
    });

    // Get applications received by user's projects
    const applicationsReceived: ApplicationTypes[] =
      await this.prisma.application.findMany({
        where: {
          project_id: {
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
          application && application.user_id,
        );

        return user;
      }),
    );

    // Add project and user details to each application in a new variable called result
    const result: GetUserReceivedApplicationsResponse[] =
      applicationsReceived.map((application) => {
        const user = users.find((user) => user.id === application.user_id);

        const project = userProjects.find(
          (project) => project.id === application.project_id,
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

  async getApplicationsByproject_id(project_id: number, user: JwtDecodeDto) {
    const applications = await this.prisma.application.findMany({
      where: { project_id },
    });

    const project = await this.prisma.project.findUniqueOrThrow({
      where: { id: project_id },
    });

    if (project.user_id !== user.id) {
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
        where: { project_id: application.project_id, user_id: user.id },
      });

    if (existingApplication.length) {
      throw new ForbiddenException('You already applied to this project.');
    }

    // Checks if the project exists, is still open for applications and if the project job titles wanted matches the job title id provided
    const project: ProjectTypes = await this.projectService.getProjectById(
      application.project_id,
    );

    if (!project.is_online) {
      throw new ForbiddenException(
        'This project is not open for applications.',
      );
    }

    if (!project.job_titles_wanted.includes(application.job_title_id)) {
      throw new ForbiddenException(
        'This project is not looking for this job title.',
      );
    }

    // Checks if the job title id has already been taken
    if (project.job_titles_filled.includes(application.job_title_id)) {
      throw new ForbiddenException('This job title has already been taken.');
    }

    // Checks if the user id is already part of participants_ids array
    if (project.participants_ids.includes(user.id)) {
      throw new ForbiddenException('You are already part of this project.');
    }

    const newApplication: ApplicationTypes =
      await this.prisma.application.create({
        data: {
          status: 'Pending',
          user_id: user.id,
          project_id: application.project_id,
          job_title_id: application.job_title_id,
        },
      });

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

    if (application.user_id !== user.id) {
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
    // Checks if the application exists, and get it
    const applicationToUpdate = await this.prisma.application.findUniqueOrThrow(
      {
        where: { id: application.id },
      },
    );

    // Take the project id, checks if the project still exists, and get the project
    const project = await this.prisma.project.findUniqueOrThrow({
      where: { id: applicationToUpdate.project_id },
    });

    // Checks if the id in the token matches the project owner id
    if (project.user_id !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to update this application.',
      );
    }

    // Checks if the application status is already accepted or rejected
    if (applicationToUpdate.status !== 'Pending') {
      throw new ForbiddenException(
        'This application has already been accepted or rejected.',
      );
    }

    // Checks if the job title id has already been taken by another applicant if status is accepted
    if (
      application.status === 'Accepted' &&
      project.job_titles_filled.includes(applicationToUpdate.job_title_id)
    ) {
      throw new ForbiddenException('This role has already been taken.');
    }

    // Updates the job_titles_filled array if status is accepted
    if (application.status === 'Accepted') {
      await this.prisma.project.update({
        where: { id: project.id },
        data: {
          job_titles_filled: {
            push: applicationToUpdate.job_title_id,
          },
        },
      });
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
