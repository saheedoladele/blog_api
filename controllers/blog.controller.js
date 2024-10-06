import mongoose from "mongoose";
import blogModel from "../models/blog.model.js";
import userModel from "../models/user.model.js";
import { cloudinaryService, uploadImageToCloudinary } from "../services/cloudinary.service.js";


export const getAllPost = async(req, res, next) =>{
    let blogs;
    try {
        blogs = await blogModel.find().populate('user')
    } catch (error) {
        console.log(error);    
    }
    if(!blogs){
        return res.status(200).json({
            message:"No post found in the collection!",
            data: blogs
        })
    }
    return res.status(200).json({
        success: true,
        message:"Post list fetch successfully!",
        data: blogs
    })
}

export const getPostbyId = async(req, res, next) =>{
    const blogId = req.params.id
    let blog;
    try {
        blog = await blogModel.findById({_id:blogId})
        .populate('user')
        .populate({
            path: 'comments',         // Populating comments with their authors
            populate: { path: 'user', select: 'fullName' } // Fetch author of each comment
          });
    } catch (error) {
        console.log(error);    
    }
    if(!blog){
        return res.status(200).json({
            message:"No post found with this id",
           
        })
    }
    return res.status(200).json({
        success: true,
        message:"Post fetch successfully!",
        data: blog
    })
}

export const getPostbyUser = async(req, res, next) =>{
    const userId = req.params.id

    let userBlogs;
    try {
        userBlogs = await userModel.findById(userId).populate('blogs')
    } catch (error) {
        console.log(error);
    }

    if(!userBlogs){
        return res.status(201).json({
            message:"No post for the user",
            
        })
    }
    return res.status(201).json({
        success: true,
        message:"Fetch user post successfully",
        data: userBlogs
    })

}

export const deletePost = async(req, res, next) =>{
    const blogId = req.params.id
  
    
    let blog;
    try {
        blog = await blogModel.findByIdAndDelete(blogId).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()
        
    } catch (error) {
        console.log(error);    
    }
    if(!blog){
        return res.status(200).json({
            message:"No post found with this id",
           
        })
    }
    return res.status(200).json({
        success: true,
        message:"Post Deleted successfully!",
        
    })
}

// create blog
export const createPost = async(req, res, next) =>{
    const { title, summary, content, user, image} = req.body;

    let registereUser;

    
    try {
        registereUser = await userModel.findById({_id:user})
    } catch (error) {
        console.log(error)
    }
    
    if(!registereUser){
        return res.status(201).json({
                message:"Only the registered user can create post",
               
            })
    }
    
    
  // Check if all required fields are provided
  if (!title || !content || !summary) {
    return res.status(400).json({ message: 'Title, content, and summary are required' });
  }

  let imageUrl = null;

  // If an image file is provided,
  if (req.file) {
    imageUrl = await uploadImageToCloudinary(req.file.path);
  }


    // create new blog 
    const blog = new blogModel({
        title,
        summary,
        content,
        image:imageUrl, 
        user
    })

    // saving post to database
    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await blog.save({session})
        registereUser.blogs.push(blog)
        await registereUser.save({session})
        await session.commitTransaction()
    } catch (error) {
        console.log(error);  
    }
    return res.status(201).json({
        success: true,
        message:"New post created successfully",
        data: blog
    })
}

// update blog
export const updatePost = async(req, res, next) =>{
    const blogId = req.params.id;
    const { title, summary, content} = req.body;

    let blog;

    // update post to database
    try {
       blog = await blogModel.findByIdAndUpdate(blogId, {
        title,
        summary,
        content
       });
    } catch (error) {
        console.log(error);  
    }

    if(!blog){
        return res.status(201).json({
            message:"Error updating post",
            
        })
    }
    return res.status(201).json({
        success: true,
        message:"Post updated successfully",
        data: blog
    })
}