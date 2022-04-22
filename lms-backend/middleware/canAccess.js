import jwt from 'jsonwebtoken';
import Permission from "../models/permission.js";
import User from "../models/users.js"
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if(err instanceof TokenExpiredError) {
        return res.status(401).send({message: "Unauthorized! Access Token has expired!"})
    }
    return res.status(401).send({message: "You do not have authorization to access this"});
}

export default (permission) => async (req, res, next) => {
    const access = await Permission.findOne({name: permission});
    const user = await User.findOne({_id: req.user.user_id, username: req.user.username})
    
    await user.hasPermissionTo(access).then(hasAccess => {
        if(hasAccess){
            
            return next()
        } else {
            console.error('You do not have the authorization to access this.');
            return res.status(401).send({message: "You do not have authorization to access this"});
        }
    })
};