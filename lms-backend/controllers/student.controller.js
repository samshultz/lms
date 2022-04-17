import User from '../models/users.js';
import Student from '../models/student.js';
import Class from '../models/class.js';

import config from '../config.js';
import sanitizeHtml from 'sanitize-html';
import Role from '../models/roles.js';
import * as constants from "../utils/constants.js";

/**
 * add students
 * @param req
 * @returns void
*/

export async function addStudent(req, res){
    try {
        const { 
                admissionID, 
                bio, 
                bloodGroup, 
                email, 
                dateOfBirth, 
                firstName, 
                gender,
                kinAddress,
                kinFirstName,
                kinLastName,
                kinPhone,
                kinRelation,
                lastName,
                phone,
                profilePhoto,
                religion,
                roll,
                section
            } = req.body;
            let studentClass = req.body.class

        // validate user input
        if(!(firstName && lastName && studentClass && gender)){
            if(!firstName){ 
                return res.status(400).send("First Name is required")
            } else if (!lastName) {
                return res.status(400).send("Last Name is required")
            } else if(!gender) {
                return res.status(400).send("Gender is required")
            } else if (!studentClass) {
                return res.status(400).send("Student's class is required")
            }

            return res.status(400).send("All inputs are required")
        }

        // check if user already exists
        // const oldUser = await User.findOne({ username });

        // if(oldUser) {
        //     return res.status(409).send("User already Exists. Please Login");
        // }

        // Encrypt user Password
        // let encryptedPassword = await bcrypt.hash(password, config.bcrypt_salt);
        
        // Create school
        // const school = await School.create({
        //     name: sanitizeHtml(schoolName)
        // })

       
        const newStudent = new Student(req.body);
        const oldClass = await Class.findOne({ 'name': studentClass })
        if(oldClass) {
            studentClass = oldClass
        } else {
            studentClass = await Class.create({
                name: sanitizeHtml(studentClass),
                code_name: sanitizeHtml(section)
            })
        }
        const user = await User.create({
            username: sanitizeHtml("PIO" + Math.floor(1000 + Math.random() * 900000)),
            firstName: sanitizeHtml(firstName),
            lastName: sanitizeHtml(lastName),
            email: sanitizeHtml(email),
            gender: sanitizeHtml(gender),
            password: 'student1',
            phone: sanitizeHtml(phone),
            address: sanitizeHtml(req.body.address),
            userType: "student"
        });
        const studentRole = await Role.findOne({ name: constants.ROLE_STUDENT })
        user.addRoles([studentRole])
        // Let's sanitize inputs        

        newStudent.dateOfBirth = sanitizeHtml(dateOfBirth)
        newStudent.bio = sanitizeHtml(bio)
        newStudent.bloodGroup = sanitizeHtml(bloodGroup)
        newStudent.religion = sanitizeHtml(religion)
        newStudent.classRole = sanitizeHtml(roll)
        newStudent.admissionID = sanitizeHtml(admissionID)
        newStudent.nextOfKin = {
            firstName: sanitizeHtml(kinFirstName),
            lastName: sanitizeHtml(kinLastName),
            phone: sanitizeHtml(kinPhone),
            relationship: sanitizeHtml(kinRelation),
            address: sanitizeHtml(kinAddress)
        }
        newStudent.detail = user
        newStudent.class = studentClass
        
        newStudent.save((err, saved) => {
            if (err){
                return res.status(500).json(err);
            } else {
                return res.status(201).json({ student: saved })
            }
                
        })
    } catch (error) {
        console.log(error);
    }
    
}