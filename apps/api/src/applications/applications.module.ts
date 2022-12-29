import { Module } from '@nestjs/common';
import { MediaModule } from 'src/media/media.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProjectService } from 'src/projects/projects.service';
import { UserService } from 'src/user/user.service';
import { ApplicationController } from './applications.controller';
import { ApplicationService } from './applications.service';

@Module({
  imports: [PrismaModule, MediaModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, UserService, ProjectService],
})
export class ApplicationModule {}
