import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './applications/applications.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './projects/projects.module';

@Module({
  imports: [AuthModule, ProjectModule, ApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
