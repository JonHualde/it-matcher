import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ToolsAndTechnologiesController } from './tools-and-technologies.controller';
import { ToolsAndTechnologiesService } from './tools-and-technologies.service';

@Module({
  imports: [PrismaModule],
  controllers: [ToolsAndTechnologiesController],
  providers: [ToolsAndTechnologiesService],
})
export class ToolsAndTechnologiesModule {}
