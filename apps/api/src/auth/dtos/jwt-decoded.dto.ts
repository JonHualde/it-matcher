import {
  IsEmail,
  IsNumber,
  IsString,
  IsInt,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';

export class JwtDecodeDto {
  @IsBoolean()
  readonly isValid: boolean;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNumber()
  readonly id: number;

  @IsString()
  readonly firstname: string;

  @IsInt()
  @Min(0)
  @Max(10)
  readonly permission: number;

  @IsNumber()
  readonly iat: number;

  @IsNumber()
  readonly exp: number;
}
