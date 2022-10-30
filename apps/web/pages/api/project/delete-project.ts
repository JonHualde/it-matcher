import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "shared/utils/prisma";

// Helpers
import Jwt from "shared/utils/jwt";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    // 0) Verify that we have the project id
    const { projectId } = req.body;

    if (!projectId) {
      throw new Error("Missing key data, we could not delete your project.");
    }

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

    // 3) Get the right project and delete it
    const project = await prisma.project.delete({
      where: { id: projectId },
    });

    if (!project) {
      throw new Error("We could not find your project. Please contact an administrator in order to solve the issue.");
    }

    if (project) {
      res.status(200).json({ error: false, message: "Project successfully deleted." });
    }
  } catch (error: any) {
    return res.status(400).json({ error: true, errorMessage: error.message });
  }
}
