import { Router } from 'express';
import * as StudentController from '../controllers/student.controller.js';
import can from "../middleware/canAccess.js"
import * as constants from "../utils/constants.js"

const router = new Router();

// Register Users
router.route('/add').post(StudentController.addStudent, can(constants.PERMISSION_ADD_STUDENT));

export default router;