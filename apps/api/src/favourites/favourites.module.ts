import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { FavouritesController } from './favourites.controller';
import { FavouritesService } from './favourites.service';

@Module({
  imports: [PrismaModule],
  controllers: [FavouritesController],
  providers: [FavouritesService],
})
export class FavouritesModule {}
