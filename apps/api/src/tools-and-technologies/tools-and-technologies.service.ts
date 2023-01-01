import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// types
import { ToolsAndTechnologiesTypes } from '@shared-types';

@Injectable()
export class ToolsAndTechnologiesService {
  constructor(private prisma: PrismaService) {}

  async getToolsAndtechnologies(): Promise<ToolsAndTechnologiesTypes[]> {
    return this.prisma.tools_and_technologie.findMany();
  }
}
