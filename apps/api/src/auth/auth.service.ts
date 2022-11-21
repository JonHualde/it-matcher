import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

// services
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    if (!email || !password) return null;

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email: email },
    });

    if (!bcrypt.compareSync(password, user.password)) return null;

    delete user.password;
    return user;
  }

  async login(user: any, res: Response) {
    res.cookie(
      'access-token',
      this.jwtService.sign({
        email: user.email,
        id: user.id,
        firstName: user.first_name,
        permission: user.permission,
      }),
    );

    return user;
  }
}
