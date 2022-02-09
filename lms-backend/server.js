import express from 'express';
// import * as users from './routes/user.routes';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import bodyParser from 'body-parser';
import path from 'path';
import Pusher from 'pusher';
import users from "./routes/user.routes.js";
import config from "./config.js"

const { port, connection_url } = config

//app config
Grid.mongo = mongoose.mongo
const app = express()

// middleware
app.use(bodyParser.json())
app.use(cors())

//DB Config

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log("Successfully connect to MongoDB."))
  .catch(err => console.error("Connection error", err));
//api routes
app.use('/api', users)

//listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`))