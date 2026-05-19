import express from "express";

import {
  saveSettings,
  getSettings,
} from "../controllers/settingsController";

const router = express.Router();


// GET SETTINGS
router.get(
  "/",
  getSettings
);


// SAVE SETTINGS
router.post(
  "/",
  saveSettings
);

export default router;