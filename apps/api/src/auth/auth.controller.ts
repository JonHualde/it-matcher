import { Controller, Get, Post, Res, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';

// Guards
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    return this.authService.login(req.user, res);
  }

  @UseGuards(AuthGuard)
  @Get('protected')
  protectedRoute() {
    return 'hey';
  }

  @Get('signout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('access_token', '', { expires: new Date() });
  }
}
