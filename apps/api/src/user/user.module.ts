import { Module } from '@nestjs/common';
// Services
import { UserService } from './user.service';
// Controllers
import { UserController } from './user.controller';
// Modules
import { PrismaModule } from 'src/prisma/prisma.module';
import { MediaModule } from 'src/media/media.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule, MediaModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
