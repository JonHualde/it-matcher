import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';

// External modules
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProjectController } from './projects.controller';
import { ProjectService } from './projects.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectController],
  providers: [ProjectService, JwtStrategy],
})
export class ProjectModule {}
