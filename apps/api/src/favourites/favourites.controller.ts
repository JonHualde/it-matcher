import {
  Request,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FavouritesService } from './favourites.service';

@UseGuards(JwtAuthGuard)
@Controller('favourite')
export class FavouritesController {
  constructor(private readonly FavouritesService: FavouritesService) {}
  @Get('all')
  async getAllFavourites(@Request() req) {
    return this.FavouritesService.getAllFavourites(req.user);
  }

  @Get('user')
  async getUserFavourites(@Request() req) {
    return this.FavouritesService.getUserFavourites(req.user);
  }

  @Post(':id')
  async addProjectAsFavourite(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    return this.FavouritesService.addProjectAsFavourite(id, req.user);
  }

  @Delete(':id')
  async removeProjectFromFavourites(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    return this.FavouritesService.removeProjectFromFavourites(id, req.user);
  }
}
