import { Router } from "express";

import { addComment } from "../controllers/comment.controller.js";

const commentRouter = Router();


commentRouter.post('/:postId',  addComment)



export default commentRouter