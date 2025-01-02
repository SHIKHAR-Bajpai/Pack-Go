import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    const { Name, email, password, photo, role } = req.body;
    try {
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: "Email already exhists" });
        }

        const newUser = new User({
            Name,
            email,
            password,
            photo,
            role: role || "user"
        });
        const savedUser = await newUser.save();
        // console.log("User created successfully");
        res.status(201).json({ success: true, message: "Successfully created user"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to Create user. Try again" });
    }
};

export const loginUser = async ( req , res ) => {
    const { email , password } = req.body

    try{
        const user = await User.findOne({ email : email });
        if( !user ){
            return res.status(404).json({ success: false, message: "User not found" })
        }
        const isMatch = await user.matchPassword( password )
        if( !isMatch ){
            return res.status(401).json({ success: false, message: "Incorrect Password" })
        }
        const token = jwt.sign({ id : user._id , role : user.role } , process.env.JWT_SECRET_KEY , { expiresIn : "1d"} );

        return res.status(200).json({
                Name : user.Name,
                role : user.role,
                token
        })
    }catch(err){
        // console.log(err)
        return res.status(500).json({ success: false, message: "Failed to login. Try again" })
    }
}

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        const alluser = (user) => {
            const { _id, Name, email, role , createdAt , updatedAt } = user;
            return {
                _id,
                Name,
                email,
                role,
                createdAt,
                updatedAt
            }
        }
        const response = users.map(alluser);
        res.status(200).json({ success: true, message: "Successful", data: response });
    } catch (err) {
        res.status(404).json({ success: false, message: "Internal server error" });
    }
}

export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (req.user.id !== id && req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "You are not authorized to update this user" });
        }
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt); 
        }
        if (req.user.role !== "admin" && req.body.role && req.body.role === "admin") {
            return res.status(403).json({ success: false, message: "You cannot change your role to admin" });
        }
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body,
        }, { new: true });

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedUser,
        });
    } catch (err) {
        console.error(err); 
        res.status(500).json({
            success: false,
            message: "Failed to update",
        });
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id); 
        res.status(200).json({
            success: true,
            message: "Successfully deleted",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete",
        });
    }
}

export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found" 
            });
        }

        res.status(200).json({
            success: true,
            message: "Successfully retrieved user", 
            data: user
        });
    } catch (err) {
        console.error(err); 
        res.status(500).json({
            success: false,
            message: "Internal server error" 
        });
    }
}
