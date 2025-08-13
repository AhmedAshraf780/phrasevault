import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/app/libs/connectDb";
import User from "@/app/models/users";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.slice(7);

  try {
    await dbConnect();
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server internal error" });
  }
}
