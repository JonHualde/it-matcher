import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpException,
  HttpStatus,
  Request,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// services
import { PrismaService } from 'src/prisma/prisma.service';
import { response } from 'express';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string, request: Request) {
    console.log('headers', request.headers);

    if (!email || !password) {
      throw new BadRequestException('Missing credentials');
    }

    try {
      console.log('prisma', this.prisma.user);

      // 1) Finding the user in the db
      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });

      // 2) Check if the user exists
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // 3) Verify password
      if (!bcrypt.compareSync(password, user.password)) {
        throw new HttpException(
          'The password is not valid',
          HttpStatus.UNAUTHORIZED,
        );
      }

      console.log('user', user);

      const access_token = this.jwtService.sign({
        email: user.email,
        id: user.id,
        firstName: user.first_name,
        permission: user.permission,
      });

      console.log('access_token', access_token);

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          access_token,
        },
      };

      // return res
      //   .cookie('access_token', token, {
      //     httpOnly: true,
      //     maxAge: 72 * 60 * 60,
      //     path: '/',
      //     sameSite: 'lax',
      //     secure: process.env.NODE_ENV === 'production',
      //   })
      //   .status(200)
      //   .json({
      //     error: false,
      //     user: {
      //       id: user.id,
      //       email: user.email,
      //       firstName: user.first_name,
      //       lastName: user.last_name,
      //     },
      //     token,
      //   });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
