import { createUser, getUserByUserName } from "../db/users";
import express from "express";
import { authentication, random } from "../helpers";
import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const db = new sqlite3.Database("./database.sqlite");

// export const login = async (req: express.Request, res: express.Response) => {
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       return res.sendStatus(400);
//     }
//     const user = await getUserByUserName(username).select(
//       "+authentication.salt +authentication.password"
//     );
//     if (!user) {
//       return res.sendStatus(400);
//     }
//     const expectedHash = authentication(user.authentication.salt, password);
//     if (user.authentication.password !== expectedHash) {
//       return res.sendStatus(403);
//     }

//     const salt = random();
//     user.authentication.sessionToken = authentication(
//       salt,
//       user._id.toString()
//     );

//     await user.save();

//     res.cookie("AUTH", user.authentication.sessionToken, {
//       domain: "localhost",
//       path: "/",
//     });

//     return res.status(200).json(user).end();
//   } catch (error) {
//     console.log(error);
//     return res.sendStatus(400);
//   }
// };

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password } = req.body;
    db.all(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (err, rows: any) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return false;
        } else if (rows.length === 0) {
          res.status(404).json({ message: "username not found" });
        } else {
          const match = await bcrypt.compare(password, rows[0].password);
          if (!match) {
            res.status(401).json({ message: "incorrect password" });
            return false;
          }

          const token = jwt.sign({ username }, "mysecret", {
            expiresIn: "1h",
          });

          res.status(200).json({ rows, token });
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
    db.get(
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
