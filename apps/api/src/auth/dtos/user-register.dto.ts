import {
  IsString,
  Length,
  IsEmail,
  Matches,
  IsOptional,
} from 'class-validator';

export class UserRegisterDto {
  @IsEmail({ allow_utf8_local_part: false })
  @IsString()
  readonly email: string;

  @IsString()
  @Matches('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$', '', {
    message:
      'Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  @Length(8, 256)
  readonly password: string;

  @IsString()
  @Length(2, 256)
  readonly firstName: string;

  @IsString()
  @Length(2, 256)
  readonly lastName: string;

  @IsString()
  @IsOptional()
  readonly linkedInUrl?: string;

  @IsString()
  @IsOptional()
  readonly instagramUsername?: string;

  @IsString()
  @IsOptional()
  readonly notionPageUrl?: string;

  @IsString()
  @IsOptional()
  readonly websiteUrl?: string;
}
