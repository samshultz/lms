import mongoose from "mongoose"
import config from '../config.js'
import jwt from 'jsonwebtoken'


const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    token: {
        type: "String",
        required: true
    },
    expiryDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
});

tokenSchema.statics.createToken = async function (user, username) {
    let expiredAt = new Date();
    expiredAt.setSeconds(
        expiredAt.getSeconds() + config.jwtExpiration
    )
    let _token = jwt.sign(
        { user_id: user._id, username },
        config.token_key,
        {
            expiresIn: expiredAt.getTime()
        }
    );
    let _object = new this({
        token: _token,
        userId: user._id,
        expiryDate: expiredAt.getTime()
    })
    let token = await _object.save();
    return token.token
}

tokenSchema.statics.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
}


export default mongoose.model("Token", tokenSchema)