import { Request, Response } from "express";

import Lead from "../models/Lead";

export const getDashboardStats =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      // TOTAL LEADS
      const totalLeads =
        await Lead.countDocuments();

      // QUALIFIED LEADS
      const qualified =
        await Lead.countDocuments({
          status: "qualified",
        });

      // PENDING LEADS
      const pending =
        await Lead.countDocuments({
          status: "pending",
        });

      // CONVERSION RATE
      const conversionRate =
        totalLeads === 0
          ? 0
          : Math.round(
            (qualified /
              totalLeads) *
            100
          );

      res.status(200).json({

        success: true,

        stats: {
          totalLeads,
          qualified,
          pending,
          conversionRate,
        },

      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch dashboard stats",
      });

    }
  };