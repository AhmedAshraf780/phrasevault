import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import dbConnect from "@/app/libs/connectDb";
import User from "@/app/models/users";
import * as cookie from "cookie";

interface DecodedToken {
  userId: string;
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;

    if (req.method === "GET") {
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }
      return res.status(200).json({ phrases: user.phrases || [] });
    }

    if (req.method === "POST") {
      const { text, meaning } = req.body;
      if (!text || !meaning) {
        return res
          .status(400)
          .json({ success: false, message: "Text and meaning are required" });
      }

      const user = await User.findById(decoded.userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      user.phrases.push({ text, meaning });
      await user.save();

      return res
        .status(200)
        .json({ success: true, message: `Phrase added: ${text}` });
    }

    if (req.method === "PUT") {
      const { phrases } = req.body;
      if (!Array.isArray(phrases)) {
        return res
          .status(400)
          .json({ success: false, message: "Phrases must be an array" });
      }

      await User.findByIdAndUpdate(decoded.userId, { phrases }, { new: true });
      return res
        .status(200)
        .json({ success: true, message: "Phrases updated successfully" });
    }

    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Server Internal Error" });
  }
}
