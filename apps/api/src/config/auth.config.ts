import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  applicationName: 'it-matcher',
  refreshExpiresIn: '2w',
  accessExpireIn: '10m',
  secret: process.env.JWT_SECRET,
}));
