import userModel from "../models/user.model.js";
import { encryptPassword, generateToken, verifyPassword } from "../util/security/index.js";

export const userSignup = async(req, res, next) =>{
    const { email, fullName, password} = req.body;

    // check if the user exist
    let existingUser;
    try {
        existingUser = await userModel.findOne({email})
    } catch (error) {
        console.log(error);
        
    }
    if(existingUser){
        return res.status(200).json({
            message:"User already exists"
        })
    }
        // encrypt password before saving to database
        const encryptedPassword = await encryptPassword(password);

    // create new user if user does not exists
    const user = new userModel({
        email,
        password:encryptedPassword,
        fullName,
        blogs:[]
    })

    // saving user to database
    try {
        await user.save();
    } catch (error) {
        console.log(error);  
    }
    return res.status(201).json({
        success: true,
        message:"User created successfully",
        data: user
    })
}

export const login = async(req, res, next) =>{
    const {email, password} = req.body;

    let existingUser;
    try {
        existingUser = await userModel.findOne({email})
    } catch (error) {
        console.log(error);
        
    }
    if(!existingUser){
        return res.status(200).json({
            message:"Invalid email address"
        })
    }

   const verify = await verifyPassword(existingUser.password, password);

   if(!verify){
    return res.status(200).json({
        message:"Invalid  password"
    })
   }
  const token = generateToken(existingUser.id, existingUser.email, existingUser.fullName);

  return res.status(200).json({
    success: true,
    message:"Logged in successfully!",
    data: existingUser,
    token
 })
}