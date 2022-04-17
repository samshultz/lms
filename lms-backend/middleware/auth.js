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

const verifyToken = (req, res, next) => {
    const token =
      req.cookies.token || req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      return res.status(401).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, config.token_key);
      req.user = decoded;
    } catch (err) {
      return catchError(err, res)
    }
    return next();
  };

export default verifyToken;