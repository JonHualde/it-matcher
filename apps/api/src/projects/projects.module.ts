import { Module } from '@nestjs/common';

// Modules
import { PrismaModule } from 'src/prisma/prisma.module';
import { MediaModule } from 'src/media/media.module';
// Services
import { ProjectService } from './projects.service';
import { MediaService } from 'src/media/media.service';
// Controllers
import { ProjectController } from './projects.controller';

@Module({
  imports: [PrismaModule, MediaModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
