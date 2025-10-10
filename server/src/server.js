import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { ENV } from './lib/env.js'

import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import path from 'path'
import { connectDB } from './lib/db.js'

const app = express()
const __dirname = path.resolve()

const PORT = ENV.PORT || 5000

app.use(express.json())
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)


//Make Ready for deployment
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../client/dist")))

    app.get("*",(_,res) => {
        res.sendFile(path.join(__dirname, "../client/dist/index.html"))
    })
}

const start = async () => {
    try{
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server is running succesfully on PORT : ${PORT}`)
        })
    }catch(error){
        console.log("There was an error in running the server")
    }
}

start()