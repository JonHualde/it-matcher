import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UserService } from 'src/user/user.service';
// External modules
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
// Custom config
import authConfig from '@config/auth.config';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [
    PrismaModule,
    MediaModule,
    ConfigModule.forRoot({
      load: [authConfig],
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [
        ConfigModule.forRoot({
          load: [authConfig],
        }),
      ],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('auth') as JwtModuleOptions,
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
