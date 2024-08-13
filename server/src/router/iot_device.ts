import express from "express";
import { add, list, update, remove} from "../controllers/iot_device";
import { authenticateToken } from "../middleware";

export default (router:express.Router) => {
    router.post("/device/add", authenticateToken, add);
    router.get("/device/list", authenticateToken, list);
    router.put("/device/update/:id", authenticateToken, update);
    router.delete("/device/remove/:id", authenticateToken, remove); 
}