import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: any;
}

const authorizeRoles = (...roles: string[]) => {

  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {

   if(!roles.includes(req.user.role)){
     return res.status(403).json({
        success: false,
        message: "Access denied"
      });
   }

    next();
  };
};

export default authorizeRoles;