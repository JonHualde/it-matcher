import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
// Multer config
import { multerOptions } from 'src/config/multer.config';
// dtos
import { ProfilePictureDto } from './dtos/profile-picture.dto';
import { UpdateUserDetailsDto } from './dtos/account-details.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser(@Request() req) {
    return this.userService.getUser(req.user);
  }

  @Patch()
  async updateUserDetails(
    @Body() userDetails: UpdateUserDetailsDto,
    @Request() req,
  ) {
    return this.userService.updateUserDetails(userDetails, req.user);
  }

  @Post('upload-picture')
  @UseInterceptors(FileInterceptor('profilePicture', multerOptions()))
  async uploadPicture(
    @Body() profilePicture: ProfilePictureDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    return this.userService.uploadPicture(file, req.user);
  }
}
