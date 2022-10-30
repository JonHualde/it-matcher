import prisma from "shared/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

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

    // 3) Get PROJECTS from this USER
    const applications: any = await prisma.application.findMany({
      where: { applicantId: user.id },
    });

    if (!applications.length) {
      res.status(200).json({ error: false, requests: null });
    }

    let requests: any = [];

    if (applications.length) {
      for (const application of applications) {
        let modifiedRequest: any = application;

        const project = await prisma.project.findFirst({
          where: {
            id: application.projectId,
          },
        });

        modifiedRequest.projectName = project?.projectName;

        requests = [...requests, modifiedRequest];
      }

      res.status(200).json({ error: false, requests });
    }
  } catch (error: any) {
    return res.status(400).json({ error: true, errorMessage: error.message, requests: null });
  }
}
