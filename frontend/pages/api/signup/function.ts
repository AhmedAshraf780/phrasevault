import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/app/libs/connectDb";
import User from "@/app/models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Fill out all fields" });
  }

  try {
    await dbConnect();

    const existed = await User.findOne({ $or: [{ email }, { name }] });
    if (existed) {
      return res
        .status(409)
        .json({ success: false, message: "Account already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      userId: user._id,
      userName: user.name,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server internal error" });
  }
}
