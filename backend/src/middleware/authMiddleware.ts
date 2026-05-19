import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import User from "../models/User";


interface AuthRequest extends Request {
  user?: any;
}

const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as { id: string };

      req.user = await User.findById(decoded.id).select("-password");

      next();

    } else {

      return res.status(401).json({
        success: false,
        message: "Not authorized"
      });

    }

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Token failed"
    });

  }
};

export default protect;