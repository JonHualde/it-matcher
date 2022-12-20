import { BadRequestException, Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRegisterDto } from './dtos/user-register.dto';
import {
  AccessToken,
  RefreshToken,
  JwtDecodeDto,
} from './dtos/jwt-decoded.dto';
import { ResetPassword } from './dtos/password.dto';
import { UserService } from 'src/user/user.service';
import { ConfigType } from '@nestjs/config';

// Custom config
import authConfig from '@config/auth.config';

export enum TokenType {
  ACCESS,
  REFRESH,
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
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
    this.generateAccessToken(res, user);
    this.generateRefreshToken(res, user);

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

    this.generateAccessToken(res, user);
    this.generateRefreshToken(res, user);

    return user;
  }

  async generateAccessToken(res: Response, user: any) {
    res.cookie(
      'access_token',
      this.jwtService.sign(
        {
          tokenType: TokenType.ACCESS,
          email: user.email,
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          permission: user.permission,
        },
        {
          expiresIn: this.config.accessExpireIn,
        },
      ),
    );
  }

  async generateRefreshToken(res: Response, user: any) {
    res.cookie(
      'refresh_token',
      this.jwtService.sign(
        {
          tokenType: TokenType.REFRESH,
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          permission: user.permission,
        },
        {
          expiresIn: this.config.refreshExpiresIn,
        },
      ),
    );
  }

  async refreshToken(token: RefreshToken, res: Response) {
    const tokenData: JwtDecodeDto = this.jwtService.verify(
      token as unknown as string,
    );

    if (tokenData.tokenType !== TokenType.REFRESH)
      throw new BadRequestException('Invalid refresh token');

    const user = await this.userService.findById(tokenData.id);

    this.generateAccessToken(res, user);

    return res.status(200).json({ message: 'Token refreshed successfully' });
  }

  async verifyToken(accessToken: AccessToken, res: Response) {
    const tokenData: JwtDecodeDto = this.jwtService.verify(
      accessToken as unknown as string,
    );

    if (tokenData.tokenType !== TokenType.ACCESS)
      throw new BadRequestException('Invalid access token');

    return res
      .status(200)
      .json({ message: 'Token verified successfully', userId: tokenData.id });
  }

  async comparePasswords(passwordInDB: string, passwordTypedByUser: string) {
    return bcrypt.compareSync(passwordTypedByUser, passwordInDB);
  }

  async resetPassword(body: ResetPassword, user: JwtDecodeDto) {
    const userData = await this.prisma.user.findUniqueOrThrow({
      where: { id: user.id },
    });

    const arePasswordsMatching = this.comparePasswords(
      userData.password,
      body.currentPassword,
    );

    if (!arePasswordsMatching)
      throw new BadRequestException('The current password is incorrect.');

    const passwordHash = this.preparePassword(body.currentPassword);

    return await this.prisma.user.update({
      where: { id: user.id },
      data: { password: passwordHash },
    });
  }
}
