import { Router } from "express";

import { getAllPost, createPost, updatePost, getPostbyId, deletePost, getPostbyUser } from "../controllers/blog.controller.js";
import upload from "../middleware/uploadMiddleware.js";
const blogRouter = Router();




blogRouter.get('/', getAllPost)
blogRouter.get('/:id', getPostbyId)
blogRouter.get('/user/:id', getPostbyUser)
blogRouter.delete('/:id', deletePost)
blogRouter.post('/', upload.single('image'), createPost)
blogRouter.put('/update/:id',upload.single('image'), updatePost);


export default blogRouter