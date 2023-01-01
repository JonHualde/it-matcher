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
    const projects = await prisma.project.findMany({
      where: { userId: user.id },
    });

    if (!projects.length) {
      res.status(200).json({ error: false, applications: [] });
    }

    let projectsApplications: any = [];

    for (const project of projects) {
      const applications = await prisma.application.findMany({
        where: { projectId: project.id },
      });

      if (applications.length) {
        for (const application of applications) {
          let modifiedApplication: any = application;
          modifiedApplication.project_name = project.project_name;

          const applicant = await prisma.user.findUnique({
            where: { id: modifiedApplication.applicantId },
          });

          modifiedApplication.applicantName = applicant?.first_name + " " + applicant?.last_name;

          projectsApplications = [...projectsApplications, modifiedApplication];
        }
      }
    }

    if (!projectsApplications.length) {
      res.status(200).json({ error: false, applications: null });
    }

    if (projectsApplications.length) {
      res.status(200).json({ error: false, applications: projectsApplications });
    }
  } catch (error: any) {
    return res.status(400).json({ error: true, errorMessage: error.message, applications: null });
  }
}
