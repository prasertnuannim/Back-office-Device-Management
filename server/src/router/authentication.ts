import express from "express";
import { deleteToken, login, register} from "../controllers/authentication";

export default (router:express.Router) => {
    router.post("/auth/register", register);
    router.post("/auth/login", login);
    router.delete("/auth/deleteToken", deleteToken);

}