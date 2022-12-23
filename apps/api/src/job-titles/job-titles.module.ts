import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JobTitlesController } from './job-titles.controller';
import { JobTitlesService } from './job-titles.service';

@Module({
  imports: [PrismaModule],
  controllers: [JobTitlesController],
  providers: [JobTitlesService],
})
export class JobTitlesModule {}
