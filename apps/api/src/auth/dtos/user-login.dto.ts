import { IsString, Length } from 'class-validator';

export class UserLoginDto {
  @IsString()
  readonly email: string;

  @IsString()
  @Length(8, 256)
  readonly password: string;
}
