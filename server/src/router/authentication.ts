import express from "express";
import { list, login, register} from "../controllers/authentication";

export default (router:express.Router) => {
    router.post("/auth/register", register);
    router.post("/auth/login", login);
    router.get("/auth/list", list);

}