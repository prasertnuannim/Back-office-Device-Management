import { createUser, getUserByUserName } from "../db/users";
import express from "express";
import { authentication, random } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
   try {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.sendStatus(400);
    }
    const user = await getUserByUserName(username).select('+authentication.salt +authentication.password');
    if (!user) {
        return res.sendStatus(400);
    }
    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash) {
        return res.sendStatus(403);
    }

    const salt = random();
     user.authentication.sessionToken = authentication(salt, user._id.toString());

    await user.save();
    
    res.cookie('AUTH', user.authentication.sessionToken, {domain: 'localhost', path: '/'});
    
    return res.status(200).json(user).end();
   } catch (error) {
    console.log(error);
    return res.sendStatus(400);
   }
}

export const register = async (req: express.Request, res: express.Response) => {
   try {
    const {email, password, username} = req.body;

    if (!email || !password || !username) {
        return res.sendStatus(400);
    }

    const existingUser = await getUserByUserName(username);
    if (existingUser) {
        return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
        email,
        username,
        authentication: {
            salt,
            password: authentication(salt, password)
        },
    });
    return res.status(200).json(user).end();

   } catch (error) {
    console.log(error);
    return res.sendStatus(400);
   }
}