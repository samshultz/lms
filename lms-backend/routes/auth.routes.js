import { Router } from 'express';
import auth from "../middleware/auth.js"
import * as AuthController from '../controllers/auth.controller.js';
const router = new Router();

// Register Users
router.route('/register').post(AuthController.register);

// Login Users
router.route('/login').post(AuthController.login);

// Logout Users
router.route("/logout").post(auth, AuthController.logout)
// Refresh Token
router.route('/refreshToken').post(AuthController.refreshToken);

// Reset Password request
router.route('/password/reset').post(AuthController.requestPasswordReset);

// Reset Password
router.route('/password/reset/complete').post(AuthController.resetPassword);
// router.route('/users:id').get(UserController.getUser);

// // Add a new User
// router.route('/users').post(UserController.addUser)

// // Delete a user by id
// router.route('/users:id').delete(UserController.deleteUser);

export default router;