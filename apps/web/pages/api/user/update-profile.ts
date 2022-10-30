import prisma from "shared/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import cookie from "cookie";

// Helpers
import Jwt from "shared/utils/jwt";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, firstname, lastname, linkedInUrl, instagramUsername, notionPageUrl, websiteUrl, githubUrl } = req.body;
  // 1) Check sent data

  if (!email || !firstname || !lastname) {
    res.status(400);
    res.json({ error: true, errorMessage: "Missing key data" });
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

    // 4) Update user's data
    const userDetails = await prisma.user.update({
      where: { email },
      data: {
        email,
        first_name: firstname,
        last_name: lastname,
        linkedIn_url: linkedInUrl ? linkedInUrl : "",
        instagram_username: instagramUsername ? instagramUsername : "",
        website_url: websiteUrl ? websiteUrl : "",
        notion_page_url: notionPageUrl ? notionPageUrl : "",
        github_url: githubUrl ? githubUrl : "",
      },
    });

    if (!userDetails) {
      res.status(200).json({ error: true, updated: false, status: "Not Updated" });
    }

    if (userDetails) {
      res.status(200).json({
        error: false,
        updated: true,
        status: "Updated",
        user: {
          email: userDetails.email,
          firstname: userDetails.first_name,
          lastname: userDetails.last_name,
          linkedInUrl: userDetails.linkedIn_url,
          instagramUsername: userDetails.instagram_username,
          notionPageUrl: userDetails.notion_page_url,
          websiteUrl: userDetails.website_url,
          githubUrl: userDetails.github_url,
        },
      });
    }
  } catch (error: any) {
    return res.status(400).json({ error: true, errorMessage: error.message });
  }
}
