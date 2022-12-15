import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatusDto } from 'src/applications/dtos/application.dto';
import { JwtDecodeDto } from 'src/auth/dtos/jwt-decoded.dto';

@Injectable()
export class FavouritesService {
  constructor(private prisma: PrismaService) {}

  async getAllFavourites(user: JwtDecodeDto) {
    if (user.permission !== 1) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }

    return this.prisma.favourite.findMany({
      take: 100,
    });
  }

  async getUserFavourites(user: JwtDecodeDto) {
    return this.prisma.favourite.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  async addProjectAsFavourite(projectId: number, user: JwtDecodeDto) {
    return this.prisma.favourite.create({
      data: {
        projectId: projectId,
        userId: user.id,
      },
    });
  }

  async removeProjectFromFavourites(favouriteId: number, user: JwtDecodeDto) {
    return this.prisma.favourite.deleteMany({
      where: {
        id: favouriteId,
        userId: user.id,
      },
    });
  }
}
