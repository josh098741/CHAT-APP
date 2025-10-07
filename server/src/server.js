import dotenv from 'dotenv'
import express from 'express'
import authRoutes from './routes/auth.route.js'

dotenv.config()
const app = express()

app.use("/api/auth",authRoutes)

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