import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRegisterDto } from './dtos/user-register.dto';

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

  preparePassword(input: string): string {
    const saltRounds = 12;
    const passwordHash = bcrypt.hashSync(input, saltRounds);

    return passwordHash;
  }

  async login(user: any, res: Response) {
    res.cookie(
      'access_token',
      this.jwtService.sign({
        email: user.email,
        id: user.id,
        firstName: user.first_name,
        permission: user.permission,
      }),
    );

    return user;
  }

  async register(userData: UserRegisterDto, res: Response) {
    const passwordHash = this.preparePassword(userData.password);

    const user = await this.prisma.user.create({
      data: {
        email: userData.email,
        password: passwordHash,
        first_name: userData.firstname,
        last_name: userData.lastname,
        linkedIn_url: userData.linkedInUrl,
        instagram_username: userData.instagramUsername,
        website_url: userData.websiteUrl,
        notion_page_url: userData.notionPageUrl,
        permission: 0,
        profile_picture_ref: '',
      },
    });

    res.cookie(
      'access_token',
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
