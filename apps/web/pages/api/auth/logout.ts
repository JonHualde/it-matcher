import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default function (req: NextApiRequest, res: NextApiResponse) {
  return res
    .setHeader(
      "Set-Cookie",
      "access_token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    )
    .status(200)
    .json({
      error: false,
      cookie: "Cleared",
    });
}
