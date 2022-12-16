import { Module } from '@nestjs/common';

// External modules
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProjectController } from './projects.controller';
import { ProjectService } from './projects.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
