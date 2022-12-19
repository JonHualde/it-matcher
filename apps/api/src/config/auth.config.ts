import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  applicationName: 'it-matcher',
  accessExpireIn: '1d',
  refreshExpiresIn: '2w',
  secret: process.env.JWT_KEY,
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
}));
