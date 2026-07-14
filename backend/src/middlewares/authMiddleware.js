import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";

export const validateAuthCookie = ( allowedTypes =[]) => {
    return (req, res, next) => {
        try {
            const {authCoookie} = req.cookies;
            if(!authCoookie) {
                return res.status(403).json({message: "Noo cookie for authorization required"});
            }
            const decoded = jsonwebtoken.verify(authCoookie, config.JWT.secret);
            if(!allowedTypes.includes(decoded.type)) {
                return res.status(402).json({message: "Access denied"});
            }
            next();
        } catch (error) {
            console.log("error", error);
            return res.status(500).json({message: "Internal server error"});
        }
    }
}