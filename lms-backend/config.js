import dotenv from 'dotenv'

dotenv.config()

const config = {
    port: process.env.PORT,
    connection_url: process.env.MONGO_URI
}

export default config;