import { IsString, Length, Matches, ValidateIf, Equals } from 'class-validator';
import { Match } from '@decorators/match.decorator';

export class ResetPassword {
  @IsString()
  @Length(8, 256)
  readonly currentPassword: string;

  @IsString()
  @Length(8, 256)
  @Matches('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$', '', {
    message:
      'Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  readonly newPassword: string;

  @ValidateIf((o) => o.newPassword)
  @IsString()
  @Length(8, 256)
  @Match('newPassword')
  readonly confirmNewPassword: string;
}
