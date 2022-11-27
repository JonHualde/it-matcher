import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { jwtConstants } from './constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtDecodeDto } from './dtos/jwt-decoded.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      // get JWT from Header
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // get JWT from cookie
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies.access_token,
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
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
