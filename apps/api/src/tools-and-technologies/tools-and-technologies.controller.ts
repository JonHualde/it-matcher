import { Controller, Get } from '@nestjs/common';
import { ToolsAndTechnologiesService } from './tools-and-technologies.service';

@Controller('tools-and-technologies')
export class ToolsAndTechnologiesController {
  constructor(
    private readonly toolsAndTechnologiesService: ToolsAndTechnologiesService,
  ) {}

  @Get()
  async getJobTitles() {
    return this.toolsAndTechnologiesService.getToolsAndtechnologies();
  }
}
