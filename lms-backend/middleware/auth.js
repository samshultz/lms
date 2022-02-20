import jwt from 'jsonwebtoken';
import config from "../config.js"
import {refreshToken } from "../utils/refreshToken.js"
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if(err instanceof TokenExpiredError) {
        return res.status(401).send({message: "Unauthorized! Access Token has expired!"})
    }
    return res.status(401).send({message: "Unauthorized!"});
}

export default async function verifyToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    const requestToken = req.cookies.refreshToken || req.body.refreshToken || req.query.refreshToken
    if(!token) {
        if(requestToken) {
            refreshToken(requestToken, req, res)
            return
        } else {
            return res.status(403).json({message: "A token is required for authentication"})
        }
    } 
    
    try {
        const decoded = jwt.verify(token, config.token_key);
        req.user = decoded;
    } catch(error) {
        return catchError(error, res)
        // return res.status(401).send({message: "Invalid Token"});
    }
    return next();
}