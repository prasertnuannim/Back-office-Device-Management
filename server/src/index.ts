import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./router";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(3001, () => {
  console.log("Server is running on http://localhost:3001/");
});

app.use("/", router());
