import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ProjectIdDto } from './dtos/project.dto';
import { ProjectService } from './project.service';

@UseGuards(AuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('delete')
  async delete(@Body() projectId: ProjectIdDto) {
    return this.projectService.delete(projectId);
  }
}
