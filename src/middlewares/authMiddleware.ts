import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user"; 

const JWT_SECRET = process.env.JWT_SECRET;

interface AuthRequest extends Request {
  user?: any; 
}

export const verifyJWT = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1]; 
  console.log("Token is:", token);

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      message: "No token provided",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as JwtPayload;

    if (!decoded.id) {
      return res.status(403).json({
        statusCode: 403,
        message: "Invalid token",
        success: false,
      });
    }

    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: "User not found",
        success: false,
      });
    }

    req.user = user; 
    next(); 
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({
      statusCode: 403,
      message: "Failed to authenticate token",
      success: false,
    });
  }
};