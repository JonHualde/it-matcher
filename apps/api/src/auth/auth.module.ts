import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UserService } from 'src/user/user.service';
// External modules
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
// Custom config
import authConfig from '@config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfig],
    }),
    PrismaModule,
    UserModule,
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
  providers: [AuthService, JwtStrategy, LocalStrategy, UserService],
})
export class AuthModule {}
