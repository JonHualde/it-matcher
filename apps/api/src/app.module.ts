import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './applications/applications.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './projects/projects.module';
import { FavouritesModule } from './favourites/favourites.module';
import { UserModule } from './user/user.module';
import { JobTitlesModule } from './job-titles/job-titles.module';
import { ToolsAndTechnologiesModule } from './tools-and-technologies/tools-and-technologies.module';
import { MediaModule } from './media/media.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ProjectModule,
    ApplicationModule,
    FavouritesModule,
    UserModule,
    JobTitlesModule,
    ToolsAndTechnologiesModule,
    MediaModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// ConfigModule.forRoot({
//   isGlobal: true,
//   envFilePath:
//     process.env.NODE_ENV === 'dev'
//       ? join(process.cwd(), 'environment', 'dev.env')
//       : join(process.cwd(), 'environment', 'prod.env'),
// }),
