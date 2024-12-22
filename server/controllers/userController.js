import User from "../models/User.js";
import customResponse from "../utilities/response.js";



export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return customResponse(res, "Users retrieved successfully", users, 200, true);
    } catch (error) {
        return customResponse(res, error.message, null, 500, false);
    }
    }
    

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user
            = await User.findById(id);
        if (!user) {
            return customResponse(res, "User not found", null, 404, false);
        }
        return customResponse(res, "User retrieved successfully", user, 200, true);


    }   catch (error) { 
        return customResponse(res, error.message, null, 500, false);
    }
}


export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, role ,img} = req.body;
    try {
        const
            user = await
            User.findById(id);
        if (!user) {
            return customResponse(res, "User not found", null, 404, false);
        }
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.role = role;
        user.img=img;
        const updatedUser = await user.save();
        return customResponse(res, "User updated successfully", updatedUser, 200, true);
    }
    catch (error) {
        return customResponse(res, error.message, null, 500, false);
    }

}