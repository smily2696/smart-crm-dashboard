import { Request, Response } from "express";

import Settings from "../models/Settings";


// SAVE SETTINGS
export const saveSettings = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      companyName,
      email,
    } = req.body;

    let settings = await Settings.findOne();

    // UPDATE EXISTING SETTINGS
    if (settings) {

      settings.companyName =
        companyName;

      settings.email = email;

      await settings.save();

    } else {

      // CREATE NEW SETTINGS
      settings =
        await Settings.create({
          companyName,
          email,
        });

    }

    res.status(200).json({
      success: true,
      message:
        "Settings saved successfully",
      settings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        "Failed to save settings",
    });

  }
};


// GET SETTINGS
export const getSettings = async (
  req: Request,
  res: Response
) => {

  try {

    const settings =
      await Settings.findOne();

    res.status(200).json({
      success: true,
      settings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch settings",
    });

  }
};