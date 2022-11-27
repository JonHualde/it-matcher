import {
  Body,
  Request,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Patch,
  Post,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { application } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApplicationService } from './applications.service';
import { ApplicationDto, statusDto } from './dtos/application.dto';

@UseGuards(JwtAuthGuard)
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get('all/:status?')
  async getAllApplications(@Param('status') status: statusDto) {
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

  @Post()
  async createNewApplication(
    @Body() application: ApplicationDto,
    @Request() req,
  ) {
    return this.applicationService.createNewApplication(application, req.user);
  }

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

  @Patch(':applicationId/:status')
  async updateApplicationStatus(
    @Param('applicationId', ParseIntPipe) applicationId: number,
    @Param('status') status: statusDto,
    @Request() req,
  ) {
    return this.applicationService.updateApplicationStatus(
      applicationId,
      status,
      req.user,
    );
  }
}
