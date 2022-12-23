import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobTitlesService {
  constructor(private prisma: PrismaService) {}

  async getJobTitles() {
    return this.prisma.job_title.findMany();
  }
}
