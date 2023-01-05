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
// types
import { UserResponse } from '@types';
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

    const user: UserResponse = await this.prisma.user.findUniqueOrThrow({
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

  async login(user: UserResponse, res: Response) {
    this.generateAccessToken(user, res);
    this.generateRefreshToken(user, res);

    return user;
  }

  async register(userData: UserRegisterDto, res: Response) {
    const passwordHash = this.preparePassword(userData.password);

    const user: UserResponse = await this.prisma.user.create({
      data: {
        email: userData.email,
        password: passwordHash,
        first_name: userData.firstName,
        last_name: userData.lastName,
        linkedIn_url: '',
        instagram_username: '',
        website_url: '',
        github_url: '',
        notion_page_url: '',
        permission: 0,
        profile_picture_ref: '',
      },
    });

    this.generateAccessToken(user, res);
    this.generateRefreshToken(user, res);

    return user;
  }

  async generateAccessToken(user: UserResponse, res: Response) {
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

  async generateRefreshToken(user: UserResponse, res: Response) {
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

    const user: UserResponse = await this.userService.findById(tokenData.id);

    this.generateAccessToken(user, res);

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
      .json({ message: 'Token verified successfully', user_id: tokenData.id });
  }

  async logout(res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return res.status(200).json({ message: 'Logged out successfully' });
  }

  async comparePasswords(passwordInDB: string, passwordTypedByUser: string) {
    return bcrypt.compareSync(passwordTypedByUser, passwordInDB);
  }

  async resetPassword(body: ResetPassword, user: JwtDecodeDto) {
    const userData: UserResponse = await this.prisma.user.findUniqueOrThrow({
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
