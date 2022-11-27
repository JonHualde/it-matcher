import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtDecodeDto } from 'src/auth/dtos/jwt-decoded.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { statusDto } from './dtos/application.dto';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async getAllApplications(applicationStatus?: statusDto) {
    const status = applicationStatus ? applicationStatus : null;
    const applications = await this.prisma.application.findMany({
      where: {
        ...(status ? { status } : {}),
      },
    });

    return applications;
  }

  async getApplicationById(applicationId: number) {
    return await this.prisma.application.findUniqueOrThrow({
      where: { id: applicationId },
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
}
