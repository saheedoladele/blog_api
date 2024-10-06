import { Router } from "express";
import { login, userSignup } from "../controllers/auth.controller.js";
import { getAllUsers } from "../controllers/user.controller.js";

const userRouter = Router();


userRouter.post('/', userSignup)
userRouter.post('/login', login)
userRouter.get('/', getAllUsers)

export default userRouter