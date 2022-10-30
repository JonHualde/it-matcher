import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "shared/utils/prisma";

// Helpers
import Jwt from "shared/utils/jwt";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1) Is Jwt valid
    const token = req.cookies.access_token;
    if (!token) throw new Error("You need to log in in order to access this page.");

    let tokenVerified = new Jwt(token).verifyToken();
    if (tokenVerified.error) throw new Error("Could not authenticate you. Please log in again.");

    // 2) Get user in the db
    const user = await prisma.user.findUnique({
      where: { id: tokenVerified.id },
    });

    if (!user) throw new Error("The user does not seem to exist. Go to /signup to create an account.");

    // 3) Get projects from a specific user
    const projects = await prisma.project.findMany({
      where: { userId: user.id },
    });

    if (!projects.length) {
      res.status(200).json({ error: true, projects: null });
    }

    if (projects.length) {
      res.status(200).json({ error: false, projects });
    }

    // 2) Retrieve these projects
  } catch (error) {
    res.status(400).json({
      error: true,
      errorMessage: "An error occurrend while getting the project. Please reload the page.",
    });
  }
}
