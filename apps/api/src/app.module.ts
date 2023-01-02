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
