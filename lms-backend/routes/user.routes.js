import { Router } from 'express';
import * as UserController from '../controllers/user.controller.js';
const router = new Router();

// Get all Users
router.route('/users').get(UserController.getUsers);

// Get one user by id
router.route('/users:id').get(UserController.getUser);

// Add a new User
router.route('/users').post(UserController.addUser)

// Delete a user by id
router.route('/users:id').delete(UserController.deleteUser);

export default router;