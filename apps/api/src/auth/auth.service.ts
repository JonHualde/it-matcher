import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

// services
import { PrismaService } from 'src/prisma/prisma.service';
import { response } from 'express';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string, res: Response) {
    if (!email || !password) {
      throw new BadRequestException('Missing credentials');
    }

    try {
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

      // 4) Setting the access_token
      res.cookie(
        'access-token',
        this.jwtService.sign({
          email: user.email,
          id: user.id,
          firstName: user.first_name,
          permission: user.permission,
        }),
      );

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
        },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
