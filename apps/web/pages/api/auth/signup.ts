import prisma from "shared/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import cookie from "cookie";

// Helpers
import Jwt from "shared/utils/jwt";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, password, firstname, lastname, linkedInUrl, instagramUsername, notionPageUrl, websiteUrl } = req.body;

  if (!email || !password || !firstname || !lastname) {
    res.status(400);
    res.json({ error: true, errorMessage: "Missing credentials" });
    return;
  }

  try {
    // 1) Check if a user already exists
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      throw "User already exists";
    }

    // 2) Hash password
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        res.status(400).json({
          error: true,
          errorMessage: "An error occurred while hashing your password.",
        });

        return;
      } else {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) {
            return res.status(400).json({
              error: true,
              errorMessage: "An error occurred while hashing your password.",
            });
          }

          // 3) Insert new user into the db
          const newUser = await prisma.user.create({
            data: {
              email,
              password: hash,
              first_name: firstname,
              last_name: lastname,
              linkedIn_url: linkedInUrl,
              instagram_username: instagramUsername,
              website_url: websiteUrl,
              notion_page_url: notionPageUrl,
              permission: 0,
              profile_picture_ref: "",
            },
          });

          if (!newUser) {
            return res.status(400).json({
              error: true,
              errorMessage: "We could not create your account. Please retry.",
            });
          }

          // 4) Generate a jwt token
          const token = new Jwt().generateToken({
            email: newUser.email,
            id: newUser.id,
            firstName: newUser.first_name,
            permission: newUser.permission,
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
            .json({ error: false, newUser, token });
        });
      }
    });
  } catch (error) {
    res.status(400);
    res.json({ error: true, errorMessage: error });
  }
}
