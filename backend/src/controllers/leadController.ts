import { Request, Response } from "express";
import { Parser } from "json2csv";

import Lead from "../models/Lead";

import asyncHandler from "../utils/asyncHandler";

import sendResponse from "../utils/sendResponse";

import AppError from "../utils/AppError";


// CUSTOM REQUEST TYPE
interface AuthRequest extends Request {
  user?: any;
}


// CREATE LEAD
export const createLead = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    const { name, email, status, source } = req.body;

    const lead = await Lead.create({
      name,
      email,
      status,
      source,
      createdBy: req.user?._id
    });

    sendResponse({
      res,
      statusCode: 201,
      success: true,
      message: "Lead created successfully",
      data: lead
    });
  }
);


// GET ALL LEADS
export const getLeads = asyncHandler(
  async (req: Request, res: Response) => {

    const status = req.query.status as string;

    const source = req.query.source as string;

    const search = req.query.search as string;

    const sort = req.query.sort as string;

    const page = Number(req.query.page) || 1;

    const limit = 10;

    const skip = (page - 1) * limit;


    // QUERY OBJECT
    let query: any = {};


    // FILTER STATUS
    if (status) {
      query.status = status;
    }


    // FILTER SOURCE
    if (source) {
      query.source = source;
    }


    // SEARCH
    if (search) {

      query.$or = [

        {
          name: {
            $regex: search,
            $options: "i"
          }
        },

        {
          email: {
            $regex: search,
            $options: "i"
          }
        }

      ];
    }


    // SORTING
    let sortOption: any = {};

    if (sort === "latest") {
      sortOption.createdAt = -1;
    }

    if (sort === "oldest") {
      sortOption.createdAt = 1;
    }


    // TOTAL LEADS
    const totalLeads = await Lead.countDocuments(query);


    // FETCH LEADS
    const leads = await Lead.find(query)

      .sort(sortOption)

      .skip(skip)

      .limit(limit);


    res.status(200).json({
      success: true,

      results: leads.length,

      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalLeads / limit),
        totalLeads
      },

      data: leads
    });
  }
);


// GET SINGLE LEAD
export const getSingleLead = asyncHandler(
  async (req: Request, res: Response) => {

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      throw new AppError(
        "Lead not found",
        404
      );
    }

    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: "Lead fetched successfully",
      data: lead
    });
  }
);


// UPDATE LEAD
export const updateLead = asyncHandler(
  async (req: Request, res: Response) => {

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    if (!lead) {
      throw new AppError(
        "Lead not found",
        404
      );
    }

    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: "Lead updated successfully",
      data: lead
    });
  }
);


// DELETE LEAD
export const deleteLead = asyncHandler(
  async (req: Request, res: Response) => {

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      throw new AppError(
        "Lead not found",
        404
      );
    }

    await lead.deleteOne();

    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: "Lead deleted successfully"
    });
  }
);

export const exportLeadsCSV = asyncHandler(
  async (req: Request, res: Response) => {

    const leads = await Lead.find();

    const fields = [
      "name",
      "email",
      "status",
      "source"
    ];

    const json2csv = new Parser({ fields });

    const csv = json2csv.parse(leads);

    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment("leads.csv");

    res.send(csv);
  }
);