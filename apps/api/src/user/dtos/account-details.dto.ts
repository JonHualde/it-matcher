import { IsOptional, IsString, Length, IsEmail } from 'class-validator';

export class UpdateUserDetailsDto {
  @IsString()
  @Length(2, 256)
  readonly first_name: string;

  @IsString()
  @Length(2, 256)
  readonly last_name: string;

  @IsString()
  @IsOptional()
  readonly linkedIn_url?: string;

  @IsString()
  readonly github_url?: string;

  @IsString()
  @IsOptional()
  readonly instagram_username?: string;

  @IsString()
  @IsOptional()
  readonly website_url?: string;

  @IsString()
  @IsOptional()
  readonly notion_page_url?: string;
}
