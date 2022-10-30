import prisma from "shared/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path, { dirname } from "path";
import fs from "fs";

// Helpers
import Jwt from "shared/utils/jwt";

// Middlewares
import multer from "multer";

const upload = multer({ dest: `${__dirname}/../../../public/uploads` });

//set bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
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

    if (!user.profile_picture_ref.length) {
      return res.status(200).json({
        error: false,
        data: null,
      });
    }

    if (user.profile_picture_ref) {
      fs.readFile(`./storage/profile_pictures/${user.profile_picture_ref}`, function (err, data) {
        if (err) {
          return res.status(400).json({
            error: true,
            errorMessage: "We could not get your profile picture.",
          });
        }

        res.writeHead(200, { "Content-Type": "image/jpeg" });
        return res.end(data);
      });
    }
  } catch (error: any) {
    return res.status(400).json({ error: true, errorMessage: error.message });
  }
}
