import { Injectable, Inject } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtDecodeDto } from './dtos/jwt-decoded.dto';
import { ConfigType } from '@nestjs/config';
// Custom config
import authConfig from '@config/auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(authConfig.KEY)
    auth: ConfigType<typeof authConfig>,
    private prisma: PrismaService,
  ) {
    super({
      // get JWT from cookie
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req?.cookies?.access_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: auth.secret,
    });
  }

  async validate(payload: any): Promise<JwtDecodeDto | false> {
    // Payload is the decode value of the access token
    // At this stage, the acess token is already extracted and verified.
    // We just need to check if the user exists in the DB
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (!user) return false;

      return payload;
    } catch (error) {
      return false;
    }
  }
}
