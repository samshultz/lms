import jwt from 'jsonwebtoken';
import Permission from "../models/permission.js";
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if(err instanceof TokenExpiredError) {
        return res.status(401).send({message: "Unauthorized! Access Token has expired!"})
    }
    return res.status(401).send({message: "You do not have authorization to access this"});
}


export default (permission) => async (req, res, next) => {
    const access = await Permission.findOne({name: permission});
    console.log(req.user)
    req.user.hasPermissionTo(access).then(hasAccess => {
        if(hasAccess){
            return next()
        } else {
            console.error('You do not have the authorization to access this.');
            return catchError(err, res)
        }
    })
};