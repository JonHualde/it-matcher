import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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
        user_id: user.id,
      },
    });
  }

  async addProjectAsFavourite(id: number, user: JwtDecodeDto) {
    // Check if the user already has this project as a favourite
    const favourite = await this.prisma.favourite.findFirst({
      where: {
        project_id: id,
        user_id: user.id,
      },
    });

    if (favourite) {
      throw new ForbiddenException(
        'You already have this project as a favourite',
      );
    }

    return this.prisma.favourite.create({
      data: {
        project_id: id,
        user_id: user.id,
      },
    });
  }

  async removeProjectFromFavourites(id: number, user: JwtDecodeDto) {
    return this.prisma.favourite.deleteMany({
      where: {
        project_id: id,
        user_id: user.id,
      },
    });
  }
}
