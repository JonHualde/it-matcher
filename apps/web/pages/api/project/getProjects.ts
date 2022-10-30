import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "shared/utils/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1) Call endpoint and get the latest 10 projects
    const projects = await prisma.project.findMany();

    res.status(200).json({
      error: false,
      projects,
    });

    // 2) Retrieve these projects
  } catch (error) {
    res.status(400).json({
      error: true,
      errorMessage: "An error occurrend while getting the project. Please reload the page.",
    });
  }
}
