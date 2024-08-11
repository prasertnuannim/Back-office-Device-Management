import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import comptrssion from "compression";
import cors from "cors";;
import router from "./router";

const app = express();

app.use(cors({
    credentials: true,  
}));


// app.use(comptrssion());
// app.use(cookieParser());
//  app.use(bodyParser.json());
// app.use(cors());

app.use(express.json()); // For parsing JSON bodies
//app.use(cookieParser()); // For parsing cookies

const server = http.createServer(app);

server.listen(3001, () => {
    console.log("Server is running on http://localhost:3001/");
})

app.get('/set-cookie', (req, res) => {
    // Set a cookie named 'token'
    res.cookie('token', 'your-jwt-token', {
        httpOnly: true,   // Prevents client-side JavaScript from accessing the cookie
        secure: true,     // Ensures the cookie is sent only over HTTPS
        maxAge: 3600000,  // Cookie expiration time in milliseconds (1 hour in this case)
        sameSite: 'strict', // Helps to mitigate CSRF attacks
    });

    res.send('Cookie has been set');
});

app.use('/', router())