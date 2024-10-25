import { Router } from "express";
import UserController from "../controllers/userController.js";
import { isAuth } from "../middlewares/isAuth.js";
import { checkSession } from "../middlewares/checkSession.js";

const userRoutes = Router();
  
userRoutes.post('/login', UserController.login);
userRoutes.get('/check-session', checkSession);
userRoutes.post('/user/register', UserController.register);
userRoutes.post('/user/forgot-password', UserController.forgotPassword);
userRoutes.post('/user/reset-password', isAuth, UserController.resetPassword);

export default userRoutes;
