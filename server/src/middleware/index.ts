import { NextFunction } from "connect";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import sqlite3 from "sqlite3";

interface TokenRow {
  token: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: string | jwt.JwtPayload;
    }
  }
}
const db = new sqlite3.Database("./database.sqlite");

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    db.get("SELECT token FROM tokens", (err, row: TokenRow) => {
      if (err) {
        //      console.error("Error retrieving token from database:", err);
        return res.status(500).json({ message: "Error retrieving token" });
      }

      if (!row) {
        return res.status(404).json({ message: "Token not found" });
      } else {
        const token = row.token;

        jwt.verify(token, "mysecret", (err, decoded) => {
          if (err) {
            //.error("Token verification failed:", err);
            return res
              .status(403)
              .json({ message: "Invalid or expired token" });
          }
          req.user = decoded;
          //   console.log(req.user)
          next();
        });
      }
    });
  } catch (err) {
    //    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Unexpected error" });
  }
};
