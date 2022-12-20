import {
  Controller,
  Body,
  Get,
  Post,
  Res,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
// Dtos
import { UserRegisterDto } from './dtos/user-register.dto';
import { ResetPassword } from './dtos/password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    return this.authService.login(req.user, res);
  }

  @Post('register')
  async register(
    @Body() userData: UserRegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.register(userData, res);
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }

  @Post('refresh')
  async refreshToken(@Request() req, @Res() res: Response) {
    return this.authService.refreshToken(req.cookies.refresh_token, res);
  }

  @Get('verify-token')
  async verifyToken(@Request() req, @Res() res: Response) {
    return this.authService.verifyToken(req.cookies.access_token, res);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('reset-password')
  async resetPassword(@Body() body: ResetPassword, @Request() req) {
    return this.authService.resetPassword(body, req.user);
  }
}
