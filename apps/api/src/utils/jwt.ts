const dotenv = require('dotenv');
import jwt from 'jsonwebtoken';

// get config vars
dotenv.config();

export default class Jwt {
  token: string;
  secretKey: string;

  constructor(token: string = '') {
    this.token = token || '';
    this.secretKey = process.env.JWT_SECRET;
  }

  generateToken(userDetails) {
    console.log('jwt', jwt);
    return jwt.sign(userDetails, this.secretKey, { expiresIn: '1800s' });
  }

  verifyToken() {
    return jwt.verify(this.token, this.secretKey, function (err, decode) {
      if (err) {
        return { error: true, message: 'Failed to authenticate token.' };
      } else {
        return decode;
      }
    });
  }
}
