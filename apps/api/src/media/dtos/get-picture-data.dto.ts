import { IsString } from 'class-validator';

export class GetPictureDataDto {
  @IsString()
  key: string;
}
