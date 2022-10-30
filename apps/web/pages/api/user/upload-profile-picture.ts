import prisma from "shared/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path, { dirname } from "path";
import fs from "fs";
import moment from "moment";
import slugify from "slugify";

// Helpers
import Jwt from "shared/utils/jwt";

// Middlewares
import multer from "multer";

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

    let oldImgPath: string = "";
    if (user.profile_picture_ref.length) {
      oldImgPath = path.join(`./storage/profile_pictures`, user.profile_picture_ref);
    }

    // TODO: use sharp to resize/compress pictures
    const form = formidable({
      uploadDir: `./storage/profile_pictures`,
      keepExtensions: true,
    });

    let tempPath: string;
    let fileRef: string;

    form.on("fileBegin", (formname, file) => {
      fileRef = slugify(file.newFilename);
      tempPath = path.join(`./storage/profile_pictures`, slugify(file.newFilename));
      file.filepath = tempPath;
    });

    const data = await new Promise((resolve, reject) => {
      form.parse(req, async (err: any, fields: any, files: any) => {
        const addImageRef = await prisma.user.update({
          where: { id: tokenVerified.id },
          data: {
            profile_picture_ref: fileRef,
          },
        });

        if (err || !addImageRef) {
          fs.unlinkSync(tempPath);
          reject({ err });
        }

        if (oldImgPath.length) {
          fs.unlinkSync(oldImgPath);
        }

        resolve(files);
      });
    });

    return res.status(200).json({
      error: false,
      message: "Picture has been successfully uploaded",
    });
  } catch (error: any) {
    return res.status(400).json({ error: true, errorMessage: error.message });
  }
}

// const timeStamp = moment().format("DD-MM-YYYY");
// fs.mkdir(`./public/${timeStamp}`, { recursive: true }, function (err) {
//   return console.log(err);
// });
// const upload = multer({ dest: `${__dirname}/../../../public/uploads` });
