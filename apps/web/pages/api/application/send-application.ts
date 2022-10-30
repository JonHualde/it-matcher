import prisma from "shared/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import cookie from "cookie";

// Helpers
import Jwt from "shared/utils/jwt";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1) Get and check the req.body
    const { status, projectId, applicantId } = req.body;

    if (!status || !projectId || !applicantId) throw new Error("Missing data");

    // 2) Is Jwt valid
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({
        error: true,
        errorMessage: "You need to log in in order to access this page.",
      });
    }

    let tokenVerified = new Jwt(token).verifyToken();

    if (tokenVerified.error) {
      return res.status(401).json({
        error: true,
        errorMessage: "Could not authenticate you. Please log in again.",
      });
    }

    // @TODO Add extra layer of security by checking if the user already applied
    const existingApplication = await prisma.application.findMany({
      where: { projectId: +projectId, applicantId: tokenVerified.id },
    });

    if (existingApplication.length) throw new Error("Your application has already been sent over.");

    // 3) POST data
    const application = await prisma.application.create({
      data: {
        status,
        applicantId,
        projectId,
      },
    });

    if (!application) throw new Error("We could not register your application.");

    res.status(200).json({ error: false, application });
  } catch (error: any) {
    return res.status(400).json({ error: true, errorMessage: error.message });
  }
}
