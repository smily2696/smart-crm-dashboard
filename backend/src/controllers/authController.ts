
import { Request, Response } from "express";

import bcrypt from "bcryptjs";

import User from "../models/User";

import generateToken from "../utils/generateToken";

import asyncHandler from "../utils/asyncHandler";

import sendResponse from "../utils/sendResponse";

import AppError from "../utils/AppError";
import { registerSchema } from "../validations/authValidation";

// REGISTER USER
export const registerUser = asyncHandler(
  async (
    req: Request,
    res: Response
  ) => {

    registerSchema.parse(req.body);

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {

      throw new AppError(
        "User already exists",
        400
      );
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "sales"
    });

    const token = generateToken(
      user._id.toString()
    );

    sendResponse({
      res,
      statusCode: 201,
      message: "User registered successfully",

      data: {
        token,

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });

  }
);


// LOGIN USER
export const loginUser = asyncHandler(
  async (
    req: Request,
    res: Response
  ) => {

    const { email, password } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {

      throw new AppError(
        "Invalid credentials",
        400
      );
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      throw new AppError(
        "Invalid credentials",
        400
      );
    }

    const token = generateToken(
      user._id.toString()
    );

    sendResponse({
      res,
      statusCode: 200,
      message: "Login successful",

      data: {
        token,

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });

  }
);


// GET CURRENT USER
export const getMe = asyncHandler(
  async (
    req: any,
    res: Response
  ) => {

    sendResponse({
      res,
      statusCode: 200,
      message: "Current user fetched",
      data: req.user
    });

  }
);