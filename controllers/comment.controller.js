
import userModel from "../models/user.model.js";
import blogModel from "../models/blog.model.js";
import commentModel from "../models/comment.model.js";


export const addComment = async(req, res, next) =>{
    const { content, user } = req.body;
    const { postId } = req.params

    let registereUser;

    try {
        registereUser = await userModel.findById({_id:user})
    } catch (error) {
        console.log(error)
    }
    
    if(!registereUser){
        return res.status(201).json({
                message:"Only the registered user can add comment",
               
            })
    }
    
  // Check if all required fields are provided
  if ( !content ) {
    return res.status(400).json({ message: 'You have not add the comment' });
  }

  let blog
  try {
     blog = await blogModel.findById(postId);
  } catch (error) {
    console.log(error);
    
  }
  
    if (!blog) {
      return res.status(404).json({ message: 'Post not found' });
    }
    // create new blog 
    const comment = new commentModel({
        content,
        user,
        blog:postId
    })

    // saving comment to database
    try {
        await comment.save()
        blog.comments.push(comment._id);
        await blog.save();
    } catch (error) {
        console.log(error);  
    }
    return res.status(201).json({
        success: true,
        message:"You have successfully add comment",
        data: comment
    })
}
