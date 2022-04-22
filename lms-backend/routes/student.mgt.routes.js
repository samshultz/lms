import { Router } from 'express';
import * as StudentController from '../controllers/student.controller.js';
import can from "../middleware/canAccess.js"
import * as constants from "../utils/constants.js"

const router = new Router();

// Register Users
// router.use("/add", can(constants.PERMISSION_ADD_STUDENT), StudentController.addStudent)
// router.use(can(constants.PERMISSION_ADD_STUDENT))
// router.route('/add').post(StudentController.addStudent, can(constants.PERMISSION_ADD_STUDENT));

// add students
router.post(
    "/add", 
    can(constants.PERMISSION_ADD_STUDENT), 
    StudentController.addStudent
)

// gell all students
router.get(
    "/list", 
    can(constants.PERMISSION_VIEW_STUDENT), 
    StudentController.studentList
)

export default router;