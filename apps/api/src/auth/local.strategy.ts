import { Injectable, ForbiddenException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(request: any, email: string, password: string) {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new ForbiddenException('Invalid email or password');
    }

    return user;
  }
}
