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
  ParseFilePipe,
  Param,
  Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProjectIdDto, ProjectDto, FilterProjectDto } from './dtos/project.dto';
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
  async getAllProject(@Query() filterProjectDto: FilterProjectDto) {
    return this.projectService.getAllProjects(filterProjectDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'projectPicture', maxCount: 1 },
        { name: 'attachments', maxCount: 5 },
      ],
      multerOptions(),
    ),
  )
  async createNewProject(
    @Body() project: ProjectDto,
    @UploadedFiles()
    files: {
      projectPicture: Express.Multer.File[];
      attachments: Express.Multer.File[];
    },
    @Request() req,
  ) {
    // @TODO EXTRA
    // 4) Create a S3 bucket on AWS and upload files and attachments there
    return this.projectService.createNewProject(files, project, req.user);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async delete(@Body() body: ProjectIdDto, @Request() req) {
    return this.projectService.delete(body.projectId, req.user);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'projectPicture', maxCount: 1 },
      { name: 'attachments', maxCount: 5 },
    ]),
  )
  async updateApplicationStatus(
    @Body() project: ProjectDto,
    @UploadedFiles()
    files: {
      projectPicture: Express.Multer.File[];
      attachments: Express.Multer.File[];
    },
    @Request() req,
  ) {
    return this.projectService.updateProject(files, project, req.user);
  }
}
