import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from 'src/user/user.service';
import { ApplicationController } from './applications.controller';
import { ApplicationService } from './applications.service';

@Module({
  imports: [PrismaModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, UserService],
})
export class ApplicationModule {}
