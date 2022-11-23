import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectIdDto } from './dtos/project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async delete(projectId: ProjectIdDto) {
    return projectId;
  }
}
