import crypto from "crypto";
import jwt from "jsonwebtoken";

const SECRET = 'REST_API' 

export const random = () => crypto.randomBytes(128).toString("base64")

// export const authentication = (self: string, password: string) => {
//     return crypto.createHmac("sha256",[self, password].join('/')).update(SECRET).digest("hex");
// }

export const authentication = (self: string, password: string) => {
    const payload = {
        self,
        password
    };

    const token = jwt.sign(payload, SECRET, {
        algorithm: 'HS256', // HMAC using SHA-256 hash algorithm
        expiresIn: '1h'     // Token expiration time (1 hour)
    });

    return token;
};