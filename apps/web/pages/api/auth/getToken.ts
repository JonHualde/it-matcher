// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "shared/utils/prisma";

// // Helpers
// import Jwt from "shared/utils/jwt";

// export default async function (req: NextApiRequest, res: NextApiResponse) {
//   // 1) Get token
//   const token = req.cookies.access_token;

//   if (!token) {
//     return res.status(401).json({
//       error: true,
//       errorMessage: "You need to log in in order to access this page.",
//     });
//   }

//   // 2) Verify token
//   let tokenVerified = new Jwt(token).verifyToken();

//   if (tokenVerified.error) {
//     return res.status(401).json({
//       error: true,
//       errorMessage: "Could not authenticate you. Please log in again.",
//     });
//   }

//   try {
//     // 3) Get user in the db
//     const user = await prisma.user.findUnique({
//       where: { id: tokenVerified.id },
//     });

//     if (!user) {
//       return res.status(401).json({
//         error: true,
//         errorMessage: "The user does not seem to exist. Go to /signup to create an account.",
//       });
//     }

//     res.status(200).json({
//       error: false,
//       user,
//       tokenVerified,
//     });
//   } catch (error) {
//     return res.status(401).json({
//       error: true,
//       errorMessage: "An error occurred while checking your credentials. Please reload the page.",
//     });
//   }
// }
