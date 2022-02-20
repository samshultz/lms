import dotenv from 'dotenv'

dotenv.config()

const config = {
    port: process.env.PORT,
    connection_url: process.env.MONGO_URI,
    bcrypt_salt: process.env.BCRYPT_SALT,
    token_key: process.env.TOKEN_KEY,
    clientURL: process.env.CLIENT_URL,
    secret: process.env.SECRET,
    // jwtExpiration: 60,
    // jwtRefreshExpiration: 120,
    jwtExpiration: process.env.JWT_EXPIRATION,
    jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
}

export default config;