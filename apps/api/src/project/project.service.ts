import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtDecodeDto } from 'src/auth/dtos/jwt-decoded.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

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

  async getUserProjects(user: JwtDecodeDto) {
    return await this.prisma.project.findMany({
      where: { userId: user.id },
    });
  }

  async getAllProjects() {
    return await this.prisma.project.findMany({
      take: 20,
    });
  }
}
