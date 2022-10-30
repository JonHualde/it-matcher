import prisma from "shared/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// Helpers
import Jwt from "shared/utils/jwt";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const projectId = req.query.projectId;

    if (!projectId) throw new Error("Missing project id.");

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

    // 3) POST data
    const application = await prisma.application.findMany({
      where: { projectId: +projectId, applicantId: user.id },
    });

    if (!application.length) {
      res.status(200).json({ error: false, canApply: true, status: "" });
    }

    if (application.length) {
      res.status(200).json({ error: false, canApply: false, application });
    }
  } catch (error: any) {
    return res.status(400).json({ error: true, errorMessage: error.message, application: null });
  }
}
