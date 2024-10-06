import userModel from "../models/user.model.js";


export const getAllUsers = async(req, res, next) =>{
    let users;
    try {
        users = await userModel.find()
    } catch (error) {
        console.log(error);    
    }
    if(!users){
        return res.status(200).json({
            message:"No user found in the collection!",
            data: users
        })
    }
    return res.status(200).json({
        message:"Users list fetch successfully!",
        data: users
    })
}