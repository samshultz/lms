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
import studentMgt from "./routes/student.mgt.routes.js"
import config from "./config.js"

import School from './models/school.js';
import Role from "./models/roles.js"
import Permission from "./models/permission.js"

import {
  ROLE_ADMIN,
  ROLE_SUPER_ADMIN,
  ROLE_PARENT,
  ROLE_STAFF,
  ROLE_STUDENT,
  ROLE_TEACHER,
} from "./utils/constants.js"
import * as constants from "./utils/constants.js"
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

mongoose.connection.once('open', () => {
  console.log('DB Connected')

  Role.count({}, function( err, count){
    if (count < 6) {
      Role.insertMany([
        { name: ROLE_ADMIN },
        { name: ROLE_STAFF },
        { name: ROLE_STUDENT },
        { name: ROLE_TEACHER },
        { name: ROLE_PARENT },
        { name: ROLE_SUPER_ADMIN }
      ]).then(function(){
          console.log("Roles inserted")  // Success
      }).catch(function(error){
          console.log(error)      // Failure
      });
    }
  })

  Permission.count({}, function( err, count){
    if(count < 29) {
      Permission.insertMany(
        constants.ALL_PERMISSIONS
      ).then(function() {
        console.log("Permissions inserted")
      }).catch(function(error) {
        console.log(error)
      })
    }
          
  })

  async function assignPermToRoles(){
    const superAdminRole = await Role.findOne({ name: ROLE_SUPER_ADMIN });
    const AdminRole = await Role.findOne({ name: ROLE_ADMIN });
    const studentRole = await Role.findOne({ name: ROLE_STUDENT });
    const parentRole = await Role.findOne({ name: ROLE_PARENT });
    const teacherRole = await Role.findOne({ name: ROLE_TEACHER });
    
    
    const allPerm = await Permission.find({ 
      name: constants.PERMISSION_ALL 
    });
    const adminPerm = await Permission.find({
      name: constants.ADMIN_ONLY_PERMISSIONS
    })
    const studentPerm = await Permission.find({
      name: constants.STUDENT_PERMISSIONS
    })
    const parentPerm = await Permission.find({
      name: constants.PARENT_PERMISSIONS
    })
    const teacherPerm = await Permission.find({
      name: constants.TEACHER_PERMISSIONS
    })

    AdminRole.addPermissions(adminPerm)
    superAdminRole.addPermissions(allPerm)
    studentRole.addPermissions(studentPerm)
    parentRole.addPermissions(parentPerm)
    teacherRole.addPermissions(teacherPerm)

  }
  assignPermToRoles()
})
//api routes

app.use(csrfProtection)
app.get('/api/getCSRFToken', (req, res) => {
  res.json({ CSRFToken: req.csrfToken() });
});

app.use('/api/', users)
app.use("/api/auth", auth)
app.use("/api/admin/student", studentMgt)

//listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`))