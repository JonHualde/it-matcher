import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApplicationService } from './applications.service';
import { ApplicationDto, statusDto } from './dtos/application.dto';

@UseGuards(JwtAuthGuard)
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get('all/:status?')
  async getAllApplications(@Param('status') applicationStatus: statusDto) {}

  @Get('user-applications')
  async getUserApplications() {}

  @Get(':applicationId')
  async getApplicationById(@Param('id') applicationId: number) {}

  @Post()
  async createNewApplication(@Body() body: ApplicationDto) {}

  @Delete(':applicationId')
  async deleteApplicationById(@Param('id') applicationId: number) {}

  @Patch('update-application')
  async updateApplicationStatus(@Body() applicationId: number) {}
}
