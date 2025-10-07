import dotenv from 'dotenv'
import express from 'express'

import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import path from 'path'

dotenv.config()
const app = express()

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

const __dirname = path.resolve()

const PORT = process.env.PORT || 5000

//Make Ready for deployment
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../client/dist")))

    app.get("*",(_,res) => {
        res.sendFile(path.join(__dirname, "../client/dist/index.html"))
    })
}

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