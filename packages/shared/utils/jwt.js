const dotenv = require("dotenv");
import jwt from "jsonwebtoken";

// get config vars
dotenv.config();

export default class Jwt {
  constructor(token = "") {
    this.token = token || "";
    this.secretKey = process.env.JWT_SECRET;
  }

  generateToken(userDetails) {
    return jwt.sign(userDetails, this.secretKey, { expiresIn: "1800s" });
  }

  verifyToken() {
    return jwt.verify(this.token, this.secretKey, function (err, decode) {
      if (err) {
        return { error: true, message: "Failed to authenticate token." };
      } else {
        return decode;
      }
    });
  }
}
