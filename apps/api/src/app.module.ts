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
import * as dotenv from 'dotenv';

dotenv.config({
  path: `${process.cwd()}/environment/${process.env.NODE_ENV}.env`,
});

console.log('node env app: ', process.env.NODE_ENV);
@Module({
  imports: [
    AuthModule,
    ProjectModule,
    ApplicationModule,
    FavouritesModule,
    UserModule,
    JobTitlesModule,
    ToolsAndTechnologiesModule,
    MediaModule,
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
