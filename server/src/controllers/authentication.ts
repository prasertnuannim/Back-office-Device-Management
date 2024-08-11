import express from "express";
import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Router, Request, Response } from 'express';

const db = new sqlite3.Database("./database.sqlite");
export const login = async (req:Request, res: Response) => {
  try {
    const { username, password }:any = req.body;
    db.all(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (err, rows: any) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        } else if (rows.length === 0) {
          console.log("Usr not found");
          res.sendStatus(404);
          return false
       
        } else {
          const match = await bcrypt.compare(password, rows[0].password);
          if (!match) {
            res.status(401).json({ message: "incorrect password" });
            return
          }
          const token = jwt.sign({ username }, "mysecret", {
            expiresIn: "1h",
          });
        res.send({token:token, user: rows[0].userName});
        }
      }
    );
  } catch (error) {
    res.status(400).json({ error: "Error logging in" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    db.all(
      "SELECT * FROM users WHERE userName = ?",
      [username],
      async (err, row) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }
        if (!row) {
          const hashedPassword = await bcrypt.hash(password, 10);
          db.run(
            "INSERT INTO users (email, userName, password) VALUES (?, ?, ?)",
            [email, username, hashedPassword],
            function (err) {
              if (err) {
                return res.status(500).json({ error: "Error inserting user" });
              }
              return res
                .status(200)
                .json({ message: "User created successfully" });
            }
          );
        } else {
          return res.status(400).json({ error: "User already exists" });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Error creating user" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const list = async (req: express.Request, res: express.Response) => {
  try {
    const authToken = req.headers["authorization"];
    if (!authToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authToken.split(" ")[1];
    const decoded = jwt.verify(token, "mysecret");
    console.log("decoded", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    db.all("SELECT * FROM users ", async (err: any, rows: any) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return false;
      } else {
        res.status(200).json(rows);
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Error list user" });
  }
};
