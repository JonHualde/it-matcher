import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtDecodeDto } from 'src/auth/dtos/jwt-decoded.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MediaService } from 'src/media/media.service';
// Types
import { S3UploadResponse, UserResponse } from '@types';
import { BasicUserDetails } from '@types';
// dtos
import { UpdateUserDetailsDto } from './dtos/account-details.dto';
import { BasicDetailsDto } from './dtos/basic-details.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private mediaService: MediaService,
  ) {}

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

  async getBasicDetails(
    body: BasicDetailsDto,
    user: JwtDecodeDto,
  ): Promise<BasicUserDetails> {
    // Find project using project_id
    const project = await this.prisma.project.findUniqueOrThrow({
      where: {
        id: body.project_id,
      },
    });

    // Check if the project user id is the same as the user id
    if (project.user_id !== user.id) {
      throw new BadRequestException(
        'You are not authorized to get this information.',
      );
    }

    // Checks if the project participants_ids contains the user id in the body.user_id
    if (!project.participants_ids.includes(body.user_id)) {
      throw new BadRequestException(
        'You are not authorized to get this information.',
      );
    }

    return await this.prisma.user.findUniqueOrThrow({
      where: {
        id: body.user_id,
      },
      select: {
        email: true,
        first_name: true,
        last_name: true,
        linkedIn_url: true,
        instagram_username: true,
        website_url: true,
        github_url: true,
        notion_page_url: true,
        profile_picture_ref: true,
      },
    });
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
