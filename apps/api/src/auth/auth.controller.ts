import {
  Controller,
  Body,
  Get,
  Post,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { UserRegisterDto } from './dtos/user-register.dto';

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

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
  }

  @Post('register')
  async register(@Body() userData: UserRegisterDto) {
    return this.authService.register(userData);
  }
}
