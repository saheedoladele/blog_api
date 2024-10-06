
import mongoose, { Schema, model } from 'mongoose';


const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: 3
    },
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required:true
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    comments:[{
      type: mongoose.Types.ObjectId,
      ref:"Comment",
      required:true
    }]
  },
  {
    timestamps: true,
  },
);

export default model('Blog', BlogSchema);
