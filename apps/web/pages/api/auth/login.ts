import prisma from "shared/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import cookie from "cookie";

// Helpers
import Jwt from "shared/utils/jwt";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    res.json({ error: true, errorMessage: "Missing credentials" });
    return;
  }

  try {
    // 1) Finding the user in the db
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // 2) Check if the user exists
    if (!user) {
      throw "The user does not seem to exist.";
    }

    // 3) Compare password
    bcrypt.compare(password, user.password, function (err, isMatch) {
      if (err) {
        return res.status(400).json({ error: true, errorMessage: err });
      } else if (!isMatch) {
        return res.status(400).json({ error: true, errorMessage: "The password is not valid" });
      }

      // 4) Generate Jwt Token
      const token = new Jwt().generateToken({
        email: user.email,
        id: user.id,
        firstName: user.first_name,
        permission: user.permission,
      });

      return res
        .setHeader(
          "Set-Cookie",
          cookie.serialize("access_token", token, {
            httpOnly: true,
            maxAge: 72 * 60 * 60,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
          })
        )
        .status(200)
        .json({
          error: false,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
          },
          token,
        });
    });
  } catch (error) {
    res.status(400);
    res.json({ error: true, errorMessage: error });
  }
}
