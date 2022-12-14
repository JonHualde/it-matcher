import {
  Body,
  Request,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApplicationService } from './applications.service';
import {
  ApplicationDto,
  StatusDto,
  UpdateApplicationDto,
} from './dtos/application.dto';

@UseGuards(JwtAuthGuard)
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  // @TODO: Add admin guard
  @Get('all/:status?')
  async getAllApplications(@Param('status') status: StatusDto) {
    return this.applicationService.getAllApplications(status);
  }

  @Get('user')
  async getUserApplications(@Request() req) {
    return this.applicationService.getUserApplications(req.user);
  }

  @Get(':applicationId')
  async getApplicationById(
    @Param('applicationId', ParseIntPipe) applicationId: number,
  ) {
    return this.applicationService.getApplicationById(applicationId);
  }

  @Get('project/:projectId')
  async getApplicationsByProjectId(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Request() req,
  ) {
    return this.applicationService.getApplicationsByProjectId(
      projectId,
      req.user,
    );
  }

  // @TODO: Add create application limit by applicant
  @Post()
  async createNewApplication(
    @Body() application: ApplicationDto,
    @Request() req,
  ) {
    return this.applicationService.createNewApplication(application, req.user);
  }

  // @TODO: Add admin guard
  @Delete(':applicationId')
  async deleteApplicationById(
    @Param('applicationId', ParseIntPipe) applicationId: number,
    @Request() req,
  ) {
    return this.applicationService.deleteApplicationById(
      applicationId,
      req.user,
    );
  }

  @Patch()
  async updateApplicationStatus(
    @Body() application: UpdateApplicationDto,
    @Request() req,
  ) {
    return this.applicationService.updateApplicationStatus(
      application,
      req.user,
    );
  }
}
