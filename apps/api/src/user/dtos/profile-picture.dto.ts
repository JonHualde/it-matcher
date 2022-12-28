import { IsOptional, IsNotEmpty } from 'class-validator';

export class ProfilePictureDto {
  @IsOptional()
  @IsNotEmpty()
  readonly profilePicture: string;
}
