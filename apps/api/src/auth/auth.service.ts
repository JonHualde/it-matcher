import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRegisterDto } from './dtos/user-register.dto';
import { UserService } from 'src/user/user.service';

export enum TokenType {
  ACCESS,
  REFRESH,
}
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  // Used in the local strategy - LocalAuthGuard in controllers/auth/auth.controller.ts
  async validateUser(email: string, password: string) {
    if (!email || !password) return null;

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email },
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

  async login(user: UserRegisterDto, res: Response) {
    this.generateTokens(res, user);
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

    this.generateTokens(res, user);

    return user;
  }

  async generateTokens(res: Response, user: any) {
    res.cookie(
      'access_token',
      this.jwtService.sign({
        tokenType: TokenType.ACCESS,
        email: user.email,
        id: user.id,
        firstName: user.first_name,
        permission: user.permission,
      }),
    );

    res.cookie(
      'refresh_token',
      this.jwtService.sign(
        {
          tokenType: TokenType.REFRESH,
          id: user.id,
          firstName: user.first_name,
          permission: user.permission,
        },
        {
          expiresIn: '2w',
        },
      ),
    );
  }

  async refreshToken(token: string, res: Response) {
    const tokenData = this.jwtService.verify(token);

    if (tokenData.tokenType !== TokenType.REFRESH)
      throw new BadRequestException('Invalid refresh token');

    const user = await this.userService.findById(tokenData.id);

    res.clearCookie('access_token');
    res.cookie(
      'access_token',
      this.jwtService.sign({
        tokenType: TokenType.ACCESS,
        email: user.email,
        id: user.id,
        firstName: user.first_name,
        permission: user.permission,
      }),
    );

    return res.status(200).json({ message: 'Token refreshed successfully' });
  }
}
