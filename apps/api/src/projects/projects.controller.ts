import {
  Body,
  Controller,
  Request,
  Get,
  UseGuards,
  Delete,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProjectIdDto, ProjectDto } from './dtos/project.dto';
import { ProjectService } from './projects.service';

@UseGuards(JwtAuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('user')
  async getUserProject(@Request() req) {
    return this.projectService.getUserProjects(req.user);
  }

  @Get('all')
  async getAllProject() {
    return this.projectService.getAllProjects();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('projectPicture', {
      limits: { fileSize: 2000000 }, // 2Mb
    }),
  )
  async createNewProject(
    @Body() project: ProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('project', project);
    console.log('projectPicture', file);
    return 'hey';
  }

  @Delete('delete')
  async delete(@Body() body: ProjectIdDto, @Request() req) {
    return this.projectService.delete(body.projectId, req.user);
  }
}
