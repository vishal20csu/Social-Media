import path from "path"
import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import messageRoutes from "./routes/message.routes.js"
import connectToMongoDb from "./db/connectToMongoDb.js";
import {app, server} from '../Backend/socket/socket.js'




const PORT = process.env.PORT;
const __dirname = path.resolve();


dotenv.config()

app.use(express.json()); // to parse the incoming requests with json payloads(from req.body)
app.use(cookieParser()); // to parse the cookies


app.use("/api/auth",authRoutes)

app.use("/api/message",messageRoutes)

app.use("/api/users", userRoutes)

app.use(express.static(path.join(__dirname, "/Frontend/dist")))

app.get("*",(req,res) =>{
    res.sendFile(path.join(__dirname, "Frontend","dist","index.html"))
})

// app.use('/',(req,res)=>{
//     res.send('hello world');
// })


// console.log(`BHAI YE HAI ${PORT}`)   PORT UNDEFINED ISSUE    

server.listen(8000,()=>{
    connectToMongoDb()
    console.log(`Server connected on port ${8000}`)
})