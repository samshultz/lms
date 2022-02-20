import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sanitizeHtml from 'sanitize-html'
import crypto from 'crypto'

import User from '../models/users.js';
import Token from "../models/token.js"
import RefreshToken from '../models/refreshToken.js';
import School from "../models/school.js"



import config from '../config.js';

/**
 * register users
 * @param req
 * @returns void
*/

export async function register(req, res){
    try {
        const { firstName, lastName, email, password, schoolName, username, gender } = req.body;

        // validate user input
        if(!(firstName && lastName && password && schoolName && username && gender)){
            return res.status(400).send("All inputs are required")
        }

        // check if user already exists
        const oldUser = await User.findOne({ username });

        if(oldUser) {
            return res.status(409).send("User already Exists. Please Login");
        }

        // Encrypt user Password
        // let encryptedPassword = await bcrypt.hash(password, config.bcrypt_salt);
        // Create school
        const school = await School.create({
            name: sanitizeHtml(schoolName)
        })

       

        const newUser = new User(req.body);
        // Let's sanitize inputs
        newUser.username = sanitizeHtml(newUser.username);
        newUser.firstName = sanitizeHtml(newUser.firstName);
        newUser.lastName = sanitizeHtml(newUser.lastName)
        newUser.email = sanitizeHtml(newUser.email)
        newUser.gender = sanitizeHtml(gender)
        newUser.isSuperuser = true;
        
        newUser.school = school;
         
        // Create access token
         Token.createToken(newUser, username).then((token) => {
            newUser.token = token
        })
        // create refreshtoken;
        RefreshToken.createToken(newUser, username).then((tk) => {
            newUser.refreshToken = tk;
        })

        newUser.save((err, saved) => {
            if (err){
                return res.status(500).json(err);
            } else {
                return res
                    .cookie("refreshToken", saved.refreshToken, {httpOnly: true})
                    .status(201).json({ user: saved })
            }
                
        })
    } catch (error) {
        console.log(error);
    }
    
}

/**
 * login users
 * @param req, res
 * @returns void
*/

export async function login(req, res){
    try {
        let { username, password } = req.body;

        if(!(username && password)){
            return res.status(400).send("All Inputs are required");
        }

        username = sanitizeHtml(username)
        // Check if user exists in the DB
        let user = await User.findOne({ email: username });

        if(!user){
            user = await User.findOne({ username });
        }

        if(user && (await bcrypt.compare(password, user.password))){
            // Create token
            await Token.createToken(user, username).then((token) => {
                user.token = token
            })
            await RefreshToken.createToken(user, username).then((tk) => {
                
                user.refreshToken = tk
            })
            return res
                .cookie("refreshToken", user.refreshToken, {httpOnly: true})
                .status(200).json(user)
        }
        return res.status(400).send("Invalid Credentials");
    } catch (error) {
        console.log(error);
    }
}

/**
 * refresh access token
 * @param req, res
 * @return res
 */

export async function refreshToken(req, res){
    
    const { refreshToken: requestToken } = req.cookies || req.body;
    if(!requestToken){
        return res.status(403).json({message: "Refresh Token is required"});
    }

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
        return res
            .cookie("refreshToken", user.refreshToken, {httpOnly: true})
            .status(200)
            .json({
            accessToken: accessToken,
            refreshToken: refreshToken.token
        })
    } catch(err) {
        return res.status(500).send({ message: err })
    }
}

/**
 * request password reset
 * @param req, res
 * @returns password reset link
 */

export async function requestPasswordReset(req, res){
    const { email } = req.body;
    if(!email){
        return res.status(500).send("Email is required")
    }
    const user = await User.findOne({ email });

    if(!user) {
        return res.status(400).send("Email does not exist")
    }
    let token = await Token.findOne({ userId: user._id });
    if(token) await token.deleteOne();
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(config.bcrypt_salt));

    await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now()
    }).save();

    const link = `${config.clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
    // send email logic here
    return link;
}


/**
 * Reset Password
 * @params req, res
 * @returns bool
 */

export async function resetPassword(req, res) {
    const { userId, token, password } = req.body;

    let passwordResetToken = await Token.findOne({ userId });
    if(!passwordResetToken) {
        return res.status(400).send("Invalid or expired password reset token")
    }
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if(!isValid) {
        return res.status(400).send("Invalid or expired password reset token")
    }
    await User.updateOne(
        { _id: userId },
        { $set: { password: password } },
        { new: true }
    );

    const user = await User.findById({ _id: userId });

    // send email login here
    await passwordResetToken.deleteOne();
    return true;
}