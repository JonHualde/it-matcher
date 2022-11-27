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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApplicationService } from './applications.service';
import { ApplicationDto, statusDto } from './dtos/application.dto';

@UseGuards(JwtAuthGuard)
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get('all:status?')
  async getAllApplications(@Query('status') applicationStatus: statusDto) {
    return this.applicationService.getAllApplications(applicationStatus);
  }

  @Get('user-applications')
  async getUserApplications() {}

  @Get(':applicationId')
  async getApplicationById(
    @Param('applicationId', ParseIntPipe) applicationId: number,
  ) {
    return this.applicationService.getApplicationById(applicationId);
  }

  @Post()
  async createNewApplication(@Body() body: ApplicationDto) {}

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

  @Patch('update-application')
  async updateApplicationStatus(@Body() applicationId: number) {}
}
