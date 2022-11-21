import {
  IsString,
  Length,
  IsEmail,
  Matches,
  IsOptional,
} from 'class-validator';

export class UserRegisterDto {
  @IsEmail({ allow_utf8_local_part: false })
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
  readonly firstname: string;

  @IsString()
  @Length(2, 256)
  readonly lastname: string;

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
