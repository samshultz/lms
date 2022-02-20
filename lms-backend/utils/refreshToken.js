import RefreshToken from "../models/refreshToken.js";
import Token from "../models/token.js"
import User from '../models/users.js';

export async function refreshToken(requestToken, req, res){
    try {
        let refreshToken = await RefreshToken.findOne({ token: requestToken });
        if(!refreshToken){
            res.status(403).json({ message: "Invalid refresh token" });
            return
        }
        
        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.findByIdAndRemove(refreshToken._id, {useFindAndModify: false}).exec();
            res.status(403).json({
                message: "Refresh Token has expired. Please Signin"
            });
            return
        }
        let user = await User.findById(refreshToken.userId)
        let accessToken = null;
        await Token.createToken(user, user.username).then((tk) => {
            accessToken = tk
        })
        await RefreshToken.createToken(user, user.username).then((tok) => {
            refreshToken = tok
        })
        user.token = accessToken
        user.refreshToken = refreshToken
        // user.save()
       
        return res
            .cookie("refreshToken", user.refreshToken, {httpOnly: true})
            .status(200)
            .json(user)
    } catch(err) {
        return res.status(500).send({ message: err })
    }
}