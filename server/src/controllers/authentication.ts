import express from "express";
import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Router, Request, Response } from "express";
import Cookies from "js-cookie";

const db = new sqlite3.Database("./database.sqlite");
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password }: any = req.body;
    db.all(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (err, rows: any) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        } else if (rows.length === 0) {
          console.log("Usr not found");
          res.sendStatus(404);
          return false;
        } else {
          const match = await bcrypt.compare(password, rows[0].password);
          if (!match) {
            res.status(401).json({ message: "incorrect password" });
            return;
          };
          const token = jwt.sign({ username }, "mysecret", {
            expiresIn: "1h",
          });
          db.all(
            "INSERT INTO tokens (token) VALUES (?)",
            [token,],
            function (err) {
              if (err) {
                return res.status(500).json({ error: err.message });
              }
            }
          );
          res.send({ token: token, user: rows[0].userName });
        }
      }
    );
  } catch (error) {
    res.status(400).json({ error: "Error logging in" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const register = async (req: express.Request, res: express.Response) => {
  console.log(req.body);

  try {
    const { email, password, username } = req.body;
    db.all(
      "SELECT * FROM users WHERE userName = ?",
      [username],
      async (err, row) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }
        console.log("rows", row);
        if (row === undefined || row.length === 0) {
          const hashedPassword = await bcrypt.hash(password, 10);
          //console.log("password", hashedPassword);
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
  //  console.log(error);
    return res.status(400).json({ error: "Error creating user" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const list = async (req: express.Request, res: express.Response) => {
  try {
    //const authToken = req.headers["authorization"];
    const authToken = Cookies.get("authToken");
    //console.log(authToken);
    if (!authToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // const token = authToken.split(" ")[1];
    // const decoded = jwt.verify(token, "mysecret");
    // console.log("decoded", decoded);
    // if (!decoded) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    db.all("SELECT * FROM users ", async (err: any, rows: any) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return false;
      } else {
        res.status(200).json(rows);
      }
    });
  } catch (error) {
   // console.log(error);
    return res.status(400).json({ error: "Error list user" });
  }
};

// export const getToken = async (req: express.Request, res: express.Response) => {
//   const { username } = req.body;
//   console.log("username", req.body);
//   try {
//     db.all(
//       "SELECT * FROM tokens WHERE username = ?",
//       [req.params.username],
//       function (err, rows) {
//         if (err) {
//           return res.status(500).json({ error: "Error get token" });
//         }
//         if (rows) {
//           console.log;
//           res.send(rows);
//           return false;
//         } else {
//           console.log("failed");
//           res.send("failed");
//           return false;
//         }
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ error: "Error list token" });
//   }
// };

export const deleteToken = async (req: express.Request, res: express.Response) => {
  try {
    db.run(
      "DELETE FROM tokens",
      function (err) {
        if (err) {
          return res.status(500).json({ error: "Error deleting token" });
        }
        return res.status(200).json({ message: "Device token successfully" });
      }
    );
  } catch (error) {
    return res.status(400).json({ error: "Error deleting token" });
  }
};
