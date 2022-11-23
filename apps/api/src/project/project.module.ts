import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import authConfig from 'src/config/auth.config';

// External modules
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [
    PrismaModule,
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
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
