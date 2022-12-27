import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser(@Request() req) {
    return this.userService.getUser(req.user);
  }

  @Post('upload-picture')
  async uploadPicture(@Request() req) {
    return this.userService.uploadPicture(req.user, req.files);
  }
}
