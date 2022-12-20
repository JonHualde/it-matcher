import { IsEmail, IsNumber, IsString, IsInt, Min, Max } from 'class-validator';

export class JwtDecodeDto {
  @IsNumber()
  @Min(0)
  @Max(1)
  readonly tokenType: number;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNumber()
  readonly id: number;

  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsInt()
  @Min(0)
  @Max(10)
  readonly permission: number;

  @IsNumber()
  readonly iat: number;

  @IsNumber()
  readonly exp: number;
}

export class TokenDto {
  @IsString()
  readonly access_token: string;

  @IsString()
  readonly refresh_token: string;
}

export class AccessToken {
  @IsString()
  readonly access_token: string;
}
export class RefreshToken {
  @IsString()
  readonly refresh_token: string;
}
