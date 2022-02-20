import express from 'express';
// import * as users from './routes/user.routes';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import mongoSanitize from "express-mongo-sanitize";
import csurf from 'csurf';
import helmet from "helmet";
import path from 'path';
import Pusher from 'pusher';
import users from "./routes/user.routes.js";
import auth from "./routes/auth.routes.js"
import config from "./config.js"

const { port, connection_url } = config

//app config
Grid.mongo = mongoose.mongo
const app = express()

// middleware
var csrfProtection = csurf({ cookie: true })

app.use(bodyParser.json())
app.use(cors({ credentials: true, origin: config.clientURL }))
app.use(cookieParser());
app.use(helmet())
app.use(mongoSanitize());
//DB Config

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => console.log("Successfully connect to MongoDB."))
.catch(err => console.error("Connection error", err));
//api routes

app.use(csrfProtection)
app.get('/api/getCSRFToken', (req, res) => {
  res.json({ CSRFToken: req.csrfToken() });
});

app.use('/api/', users)
app.use("/api/auth", auth)

//listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`))