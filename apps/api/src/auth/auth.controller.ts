import { Controller, Body, Post, Res } from '@nestjs/common';
import { UserLoginDto } from './dtos/user-login.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    return this.authService.login(body.email, body.password, res);
  }
}
