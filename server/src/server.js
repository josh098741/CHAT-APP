import dotenv from 'dotenv'
import express from 'express'

dotenv.config()
const app = express()


app.get("/api/auth/signup",(req,res) => {
    res.send("Signup endpoint")
})

app.get("/api/auth/login",(req,res) => {
    res.send("Login Endpoint")
})

app.get("/api/auth/logout",(req,res) => {
    res.send("Logout Endpoint")
})

const PORT = process.env.PORT || 5000

const start = async () => {
    try{
        app.listen(PORT, () => {
            console.log(`Server is running succesfully on PORT : ${PORT}`)
        })
    }catch(error){
        console.log("There was an error in running the server")
    }
}

start()