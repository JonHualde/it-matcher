import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtDecodeDto } from 'src/auth/dtos/jwt-decoded.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectIdDto } from './dtos/project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async delete(projectId: number) {
    // TODO: Check first that the user is the owner of the project before deleting the project
    const project = await this.prisma.project.delete({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(
        'We could not find your project. Please contact an administrator in order to solve the issue.',
      );
    }

    return project;
  }
}
