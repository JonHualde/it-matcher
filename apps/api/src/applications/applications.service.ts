import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtDecodeDto } from 'src/auth/dtos/jwt-decoded.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApplicationDto, statusDto } from './dtos/application.dto';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async getAllApplications(status?: statusDto) {
    const applications = await this.prisma.application.findMany({
      where: {
        status,
      },
    });

    return applications;
  }

  async getUserApplications(user: JwtDecodeDto) {
    return await this.prisma.application.findMany({
      where: { applicantId: user.id },
    });
  }

  async getApplicationById(applicationId: number) {
    return await this.prisma.application.findUniqueOrThrow({
      where: { id: applicationId },
    });
  }

  async createNewApplication(application: ApplicationDto, user: JwtDecodeDto) {
    const existingApplication = await this.prisma.application.findMany({
      where: { projectId: application.projectId, applicantId: user.id },
    });

    if (existingApplication.length) {
      throw new ForbiddenException('You already applied to this project.');
    }

    return await this.prisma.application.create({
      data: {
        status: 'Pending',
        applicantId: application.applicantId,
        projectId: application.projectId,
      },
    });
  }

  async deleteApplicationById(applicationId: number, user: JwtDecodeDto) {
    const application = await this.prisma.application.findUniqueOrThrow({
      where: { id: applicationId },
    });

    if (application.applicantId !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to delete this application.',
      );
    }

    return await this.prisma.application.delete({
      where: { id: applicationId },
    });
  }

  async updateApplicationStatus(
    applicationId: number,
    status: statusDto,
    user: JwtDecodeDto,
  ) {
    // Check if the application exists, and get it
    const application = await this.prisma.application.findUniqueOrThrow({
      where: { id: applicationId },
    });

    // Take the project id, check if the project still exists, and get the project
    const project = await this.prisma.project.findUniqueOrThrow({
      where: { id: application.projectId },
    });

    // Check if the id in the token matches the project owner id
    if (project.userId !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to update this application.',
      );
    }

    // if so, update the application status
    return await this.prisma.application.update({
      where: { id: applicationId },
      data: {
        status,
      },
    });
  }
}
