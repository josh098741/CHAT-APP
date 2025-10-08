import jwt from 'jsonwebtoken'
import { ENV } from './env.js'; 

export const generateToken = (userId, res) => {
    const {JWT_SECRET, NODE_ENV} = ENV;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET not configured")
    }
    //Create a tokken for the user
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000,     //milliseconds
        httpOnly: true,              //Prevent XSS attack: cross-site scripting
        sameSite: "strict",          //CSRF attacks
        secure: process.env.NODE_ENV === "development" ? false : true
    })

    return token
}