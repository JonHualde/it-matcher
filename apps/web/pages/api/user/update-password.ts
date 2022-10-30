import prisma from "shared/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import cookie from "cookie";

// Helpers
import Jwt from "shared/utils/jwt";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { password, newPassword, confirmNewPassword } = req.body;

  // 1) Check sent data
  if (!password || !newPassword || !confirmNewPassword) {
    res.status(400);
    res.json({ error: true, errorMessage: "Missing key data." });
    return;
  }

  if (password.length < 6 || newPassword.length < 6 || confirmNewPassword.length < 6) {
    res.status(400);
    res.json({
      error: true,
      errorMessage: "One of the passwords are too short.",
    });
    return;
  }

  if (newPassword != confirmNewPassword) {
    res.status(400);
    res.json({ error: true, errorMessage: "New passwords do not match" });
    return;
  }

  try {
    // 2) Is Jwt valid
    const token = req.cookies.access_token;
    if (!token) throw new Error("You need to log in in order to access this page.");

    let tokenVerified = new Jwt(token).verifyToken();
    if (tokenVerified.error) throw new Error("Could not authenticate you. Please log in again.");

    // 3) Get the user in DB
    const user = await prisma.user.findUnique({
      where: { id: tokenVerified.id },
    });

    if (!user) throw new Error("The user does not seem to exist. Go to /signup to create an account.");

    // 4) Compare and check current password
    const compareCurrPassword = async (password: string, userPassword: string) => {
      return await bcrypt.compare(password, userPassword);
    };

    const passwordsMatch = await compareCurrPassword(password, user.password);

    if (!passwordsMatch) {
      throw new Error("The current password is not valid.");
    }

    // 5) Hash new password
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        return res.status(400).json({
          error: true,
          errorMessage: "An error occurred while hashing your password.",
        });
      } else {
        bcrypt.hash(newPassword, salt, async function (err, hash) {
          if (err) {
            return res.status(400).json({
              error: true,
              errorMessage: "An error occurred while hashing your password.",
            });
          }

          // 6) Update old password by new password
          const passwordUpdated = await prisma.user.update({
            where: { id: tokenVerified.id },
            data: {
              password: hash,
            },
          });

          if (!passwordUpdated) {
            return res.status(400).json({
              error: true,
              errorMessage: "An error occurred while updating your password. Please retry.",
            });
          }

          res.status(200).json({
            error: false,
            updated: true,
            status: "Updated",
          });
        });
      }
    });
  } catch (error: any) {
    return res.status(400).json({ error: true, errorMessage: error.message });
  }
}
