import {
  Body,
  Controller,
  Request,
  Get,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProjectIdDto } from './dtos/project.dto';
import { ProjectService } from './project.service';

@UseGuards(JwtAuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Delete('delete')
  async delete(@Body() body: ProjectIdDto, @Request() req) {
    return this.projectService.delete(body.projectId, req.user);
  }

  @Get('my-projects')
  async getUserProject(@Request() req) {
    return this.projectService.getUserProjects(req.user);
  }

  @Get('all-projects')
  async getAllProject() {
    return this.projectService.getAllProjects();
  }
}
