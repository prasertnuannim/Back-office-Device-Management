import express from "express";
import { add, list, update, remove} from "../controllers/iot_device";

export default (router:express.Router) => {
    router.post("/device/add", add);
    router.get("/device/list", list);
    router.put("/device/update/:id", update);
    router.delete("/device/remove/:id", remove);
}