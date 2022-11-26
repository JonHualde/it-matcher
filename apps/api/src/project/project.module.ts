import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';

// External modules
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectController],
  providers: [ProjectService, JwtStrategy],
})
export class ProjectModule {}
