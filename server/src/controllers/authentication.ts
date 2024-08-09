import { createUser, getUserByUserName } from "../db/users";
import express from "express";
import { authentication, random } from "../helpers";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.sendStatus(400);
    }
    const user = await getUserByUserName(username).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) {
      return res.sendStatus(400);
    }
    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// export const register = async (req: express.Request, res: express.Response) => {
//    try {
//     const {email, password, username} = req.body;

//     if (!email || !password || !username) {
//         return res.sendStatus(400);
//     }

//     const existingUser = await getUserByUserName(username);
//     if (existingUser) {
//         return res.sendStatus(400);
//     }

//     const salt = random();
//     const user = await createUser({
//         email,
//         username,
//         authentication: {
//             salt,
//             password: authentication(salt, password)
//         },
//     });
//     return res.status(200).json(user).end();

//    } catch (error) {
//     console.log(error);
//     return res.sendStatus(400);
//    }
// }

// export const register = async (req: express.Request, res: express.Response) => {
//     try {
//      const {email, password, username} = req.body;
//      if (!email || !password || !username) {
//          return res.sendStatus(400);
//      }
//     }catch (error) {
//      console.log(error);
//      return res.sendStatus(400);
//     }
//  }

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    console.log("req.body;", req.body);
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }
    db.all("INSERT INTO users (email, userName, password) VALUES (?, ?, ?)", [
      email,
      username,
      password,
    ]);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
export const list = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  db.all("SELECT * FROM users ", async (err: any, rows: any) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    } else {
      res.status(200).json(rows);
    }
  });
};
