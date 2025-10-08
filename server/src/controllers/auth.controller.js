import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import { generateToken } from "../lib/utils.js"

export const signup = async (req,res) => {
    const {fullName, email, password} = req.body
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message: "All Fields are required"})
        }

        if(password.length < 6){
            return res.status(400).json({message: "Password needs to be atleast 6 characters"})
        }

        //Check if email is valid: regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Invalid email format"})
        }

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "Email already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                password: newUser.password,
                profilePic: newUser.profilePic
            })

            //to do send a welcome message to the user
        }else{
            res.status(400).json({message: "Invalid User Data"})
        }
    }catch(error){
        console.log("Error in signup conntroller: ", error)
        res.status(500).json({message: "Internal Server error"})
    }
}

export const login = async (req,res) => {
    res.send("Login Endpoint")
}

export const logout = async (req,res) => {
    res.send("Logout Endpoint")
}