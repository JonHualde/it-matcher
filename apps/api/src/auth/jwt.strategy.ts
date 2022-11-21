import { Injectable, Inject } from '@nestjs/common';
import authConfig from 'src/config/auth.config';
import { ConfigType } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(authConfig.KEY)
    auth: ConfigType<typeof authConfig>,
  ) {
    super({
      // get JWT from Header
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // get JWT from cookie
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies.jwt,
      ]),
      ignoreExpiration: false,
      secretOrKey: auth.secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.userId, firstName: payload.firstName };
  }
}
