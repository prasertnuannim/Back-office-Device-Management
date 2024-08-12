import express from "express";
import authentication from "./authentication";
import iot_device from "./iot_device";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  iot_device(router);
  return router;
};
