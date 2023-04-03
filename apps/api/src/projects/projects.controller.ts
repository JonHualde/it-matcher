import {
  Body,
  Patch,
  Controller,
  Request,
  Get,
  UseGuards,
  Delete,
  Post,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
//dtos
import {
  project_idDto,
  ProjectDto,
  FilterProjectDto,
} from './dtos/project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ProjectService } from './projects.service';
// Multer config
import { multerOptions } from 'src/config/multer.config';



@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getUserProject(@Request() req) {
    return this.projectService.getUserProjects(req.user);
  }

  @Get('all')
  async getAllProject(@Query() filterProjectDto?: FilterProjectDto) {
    return this.projectService.getAllProjects(filterProjectDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'project_main_picture', maxCount: 1 },
        { name: 'attachments', maxCount: 5 },
      ],
      multerOptions(),
    ),
  )
  async createNewProject(
    @Body() project: ProjectDto,
    @UploadedFiles()
    files: {
      project_main_picture: Express.Multer.File[];
      attachments: Express.Multer.File[];
    },
    @Request() req,
  ) {
    return this.projectService.createNewProject(files, project, req.user);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async delete(@Body() body: project_idDto, @Request() req) {
    return this.projectService.delete(body.project_id, req.user);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'project_main_picture', maxCount: 1 },
        { name: 'attachments', maxCount: 5 },
      ],
      multerOptions(),
    ),
  )
  async updateApplicationStatus(
    @Body() project: UpdateProjectDto,
    @UploadedFiles()
    files: {
      project_main_picture: Express.Multer.File[];
      attachments: Express.Multer.File[];
    },
    @Request() req,
  ) {
    return this.projectService.updateProject(files, project, req.user);
  }
}
