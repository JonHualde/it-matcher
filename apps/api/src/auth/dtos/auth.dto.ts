import { IsString } from 'class-validator';

export class TokenDto {
  @IsString()
  readonly access_token: string;

  @IsString()
  readonly refresh_token: string;
}

export class RefreshTokenDto {
  @IsString()
  readonly token: string;
}
