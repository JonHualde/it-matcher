import {
  Body,
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
export class ApplicationController {
  constructor(private readonly FavouritesService: FavouritesService) {}
  @Get('all/:status?')
  async getAllFavourites(@Request() req) {
    return this.FavouritesService.getAllFavourites(req.user);
  }

  @Get('user')
  async getUserFavourites(@Request() req) {
    return this.FavouritesService.getUserFavourites(req.user);
  }

  @Post()
  async addProjectAsFavourite(@Body() projectId: number, @Request() req) {
    return this.FavouritesService.addProjectAsFavourite(projectId, req.user);
  }

  @Delete(':favouriteId')
  async removeProjectFromFavourites(
    @Param('favouriteId', ParseIntPipe) favouriteId: number,
    @Request() req,
  ) {
    return this.FavouritesService.removeProjectFromFavourites(
      favouriteId,
      req.user,
    );
  }
}
