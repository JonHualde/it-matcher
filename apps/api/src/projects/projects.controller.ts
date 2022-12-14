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
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProjectIdDto, ProjectDto } from './dtos/project.dto';
import { ProjectService } from './projects.service';

// Multer config
import { multerOptions } from 'src/config/multer.config';
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
    FileFieldsInterceptor(
      [
        { name: 'projectPicture', maxCount: 1 },
        { name: 'attachments', maxCount: 5 },
      ],
      multerOptions,
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
    console.log('project', project);
    console.log('files', files);

    return 'hey';

    // @TODO
    // 1) Add checks and limitations to the files upload: Size, files' type
    // 2) Create 2 new functions: One to upload files and attachments, one to create a
    // new project record in the DB
    // Size: 2Mb per file, 12Mb maximum (all files included)
    // Limits: 1 project picture, 5 attachments
    // 3) Create a public folder, that will store files and attachments

    // @TODO EXTRA
    // 4) Create a S3 bucket on AWS and upload files and attachments there
    return this.projectService.createNewProject(files, project, req.user);
  }

  @Delete('delete')
  async delete(@Body() body: ProjectIdDto, @Request() req) {
    return this.projectService.delete(body.projectId, req.user);
  }

  @Patch()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'projectPicture', maxCount: 1 },
        { name: 'attachments', maxCount: 5 },
      ],
      multerOptions,
    ),
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
