import { Response } from "express";

interface ResponseOptions {

  res: Response;

  statusCode?: number;

  success?: boolean;

  message?: string;

  data?: any;
}

const sendResponse = ({
  res,
  statusCode = 200,
  success = true,
  message = "",
  data = null
}: ResponseOptions): void => {

  res.status(statusCode).json({
    success,
    message,
    data
  });
};

export default sendResponse;