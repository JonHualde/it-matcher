import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtDecodeDto } from 'src/auth/dtos/jwt-decoded.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MediaService } from 'src/media/media.service';
// Types
import { S3UploadResponse, UserResponse } from '@types';
import { UpdateUserDetailsDto } from './dtos/account-details.dto';

@Injectable()
export class UserService {
  mediaService: MediaService;

  constructor(private prisma: PrismaService) {
    this.mediaService = new MediaService();
  }

  async getUser(user: JwtDecodeDto) {
    return this.findById(user.id);
  }

  async findByEmail(email: string): Promise<UserResponse> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    delete user.password;
    return user;
  }

  async findById(id: number): Promise<UserResponse> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });

    delete user.password;
    return user;
  }

  async updateUserDetails(
    userDetails: UpdateUserDetailsDto,
    access_token: JwtDecodeDto,
  ) {
    const user: UserResponse = await this.findByEmail(access_token.email);

    if (user.id !== access_token.id) {
      throw new BadRequestException(
        'You cannot change your email right now. Please us the appropriate form to do so.',
      );
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id: access_token.id,
      },
      data: {
        ...userDetails,
      },
    });

    delete updatedUser.password;
    return updatedUser;
  }

  async uploadPicture(file: any, access_token: JwtDecodeDto) {
    const user: { profile_picture_ref: string } =
      await this.prisma.user.findUniqueOrThrow({
        where: {
          id: access_token.id,
        },
        select: {
          profile_picture_ref: true,
        },
      });

    if (user.profile_picture_ref) {
      const deletePicture = await this.mediaService.deleteMedia(
        user.profile_picture_ref,
      );
    }

    const newProfilePictureRef: S3UploadResponse[] =
      await this.mediaService.uploadMedia([file], 'pictures');

    return await this.prisma.user.update({
      where: {
        id: access_token.id,
      },
      data: {
        profile_picture_ref: newProfilePictureRef[0].Key,
      },
    });
  }
}
