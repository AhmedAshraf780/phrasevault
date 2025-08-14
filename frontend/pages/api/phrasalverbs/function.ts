// pages/api/phrasals.ts
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import dbConnect from "@/app/libs/connectDb";
import User from "@/app/models/users";

interface DecodedToken {
  userId: string;
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.slice(7);

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
          .json({ success: false, message: "User does not exist" });
      }
      return res.status(200).json({ phrasals: user.phrasalVerbs || [] });
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

      user.phrasalVerbs.push({ text, meaning });
      await user.save();

      return res.status(200).json({
        success: true,
        message: `Phrasal verb added: ${text}`,
      });
    }

    if (req.method === "PUT") {
      const { phrasals } = req.body;
      if (!Array.isArray(phrasals)) {
        return res
          .status(400)
          .json({ success: false, message: "Phrasals must be an array" });
      }

      await User.findByIdAndUpdate(
        decoded.userId,
        { phrasalVerbs: phrasals },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Phrasals updated successfully",
      });
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
