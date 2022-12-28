import { Module } from '@nestjs/common';
// Services
import { UserService } from './user.service';
import { MediaService } from 'src/media/media.service';
// Controllers
import { UserController } from './user.controller';
// Modules
import { PrismaModule } from 'src/prisma/prisma.module';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [PrismaModule, MediaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
