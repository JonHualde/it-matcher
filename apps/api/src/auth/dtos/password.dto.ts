import { IsString, Length, Matches } from 'class-validator';

export class ResetPassword {
  @IsString()
  @Length(8, 256)
  readonly currentPassword: string;

  @IsString()
  @Length(8, 256)
  readonly newPassword: string;

  @IsString()
  @Length(8, 256)
  @Matches('newPassword')
  readonly confirmNewPassword: string;
}
