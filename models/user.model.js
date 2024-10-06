
import mongoose, { Schema, model } from 'mongoose';


const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 3
    },
    email: {
      type: String,
      unique: true,
      required: true,
      min: 3
    },
    password: {
      type: String,
      required: true,
      min: 6
    },
    profileImage: {
      type: String,
      default: ""
    },
    location: {
        type: String,
        default: ""
      },
    about: {
        type: String,
        default: ""
      },
      blogs:[{
        type: mongoose.Types.ObjectId,
        ref:"Blog",
        required:true
      }],
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

export default model('User', UserSchema);
