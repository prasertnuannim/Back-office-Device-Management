import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import comptrssion from "compression";
import cors from "cors";;
import router from "./router";

const app = express();

app.use(cors({
    credentials: true
}));

app.use(comptrssion());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);

app.get('/', function (req, res) {
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)
  
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)
  })
  
server.listen(3001, () => {
    console.log("Server is running on http://localhost:3001/");
})

app.use('/', router())