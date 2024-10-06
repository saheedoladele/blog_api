
import mongoose, { Schema, model } from 'mongoose';


const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      min: 3
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    blog:{
        type: mongoose.Types.ObjectId,
        ref:"Blog",
        required:true
    }
  },
  {
    timestamps: true,
  },
);

export default model('Comment', CommentSchema);
