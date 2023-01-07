import { Module } from '@nestjs/common';

// Modules
import { PrismaModule } from 'src/prisma/prisma.module';
import { MediaModule } from 'src/media/media.module';
import { ConfigModule } from '@nestjs/config';
// Services
import { ProjectService } from './projects.service';
// Controllers
import { ProjectController } from './projects.controller';

@Module({
  imports: [PrismaModule, MediaModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
