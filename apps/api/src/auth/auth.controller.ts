import { Controller, Body, Post, Req, Get, Header } from '@nestjs/common';
import { UserLoginDto } from './dtos/user-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: UserLoginDto, @Req() request: Request) {
    return this.authService.login(body.email, body.password, request);
  }
}
