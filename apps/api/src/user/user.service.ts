import { Injectable } from '@nestjs/common';
import { JwtDecodeDto } from 'src/auth/dtos/jwt-decoded.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(user: JwtDecodeDto) {
    return this.findById(user.id);
  }

  async findByEmail(email: string): Promise<any> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    delete user.password;
    return user;
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });

    delete user.password;
    return user;
  }

  async uploadPicture(user: JwtDecodeDto, files: any) {
    const { profilePicture } = files;

    const userUpdated = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        profile_picture_ref: profilePicture[0].filename,
      },
    });

    delete userUpdated.password;
    return userUpdated;
  }
}
