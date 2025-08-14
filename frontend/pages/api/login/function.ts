import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/app/libs/connectDb";
import User from "@/app/models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Fill out all fields" });
  }

  try {
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(409)
        .json({ success: false, message: "Account does not exist" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: user._id, email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "4d",
      }
    );
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 15,
        path: "/",
      })
    );

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      userId: user._id,
      userName: user.name,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Server internal error` });
  }
}
