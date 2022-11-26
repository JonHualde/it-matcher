import { IsString, Length, IsEmail } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(8, 256)
  readonly password: string;
}
