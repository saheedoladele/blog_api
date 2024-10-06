import { Router } from "express";
import userRouter from "./user.route.js";
import blogRouter from "./blog.route.js";
import commentRouter from "./comment.route.js";

const indexRouter = Router()

indexRouter.route('/').get((req, res, next) => {
    res.send('Blog AP1');
  });
  
 
// indexRouter.use('/auth', authRoute);
// indexRouter.use('/user', signInMiddleware, userRoute);

indexRouter.use('/user', userRouter);
indexRouter.use('/blog', blogRouter);
indexRouter.use('/comment', commentRouter);

export default indexRouter;