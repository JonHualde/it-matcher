import prisma from "shared/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import cookie from "cookie";

// Helpers
import Jwt from "shared/utils/jwt";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1) Is Jwt valid
    const token = req.cookies.access_token;
    if (!token) throw new Error("You need to log in in order to access this page.");

    let tokenVerified = new Jwt(token).verifyToken();
    if (tokenVerified.error) throw new Error("Could not authenticate you. Please log in again.");

    // 2) Get the user in DB
    const user = await prisma.user.findUnique({
      where: { id: tokenVerified.id },
    });

    if (!user) throw new Error("The user does not seem to exist. Go to /signup to create an account.");

    if (user) {
      res.status(200).json({
        error: false,
        user: {
          email: user.email,
          firstname: user.first_name,
          lastname: user.last_name,
          linkedInUrl: user.linkedIn_url,
          instagramUsername: user.instagram_username,
          websiteUrl: user.website_url,
          notionPageUrl: user.notion_page_url,
          githubUrl: user.github_url,
        },
      });
    }
  } catch (error: any) {
    return res.status(400).json({ error: true, errorMessage: error.message });
  }
}
