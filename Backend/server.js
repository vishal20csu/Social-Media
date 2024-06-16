import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import messageRoutes from "./routes/message.routes.js"
import connectToMongoDb from "./db/connectToMongoDb.js";



const app= express();
const PORT = process.env.PORT;


dotenv.config()

app.use(express.json()); // to parse the incoming requests with json payloads(from req.body)
app.use(cookieParser()); // to parse the cookies


app.use("/api/auth",authRoutes)

app.use("/api/message",messageRoutes)

app.use("/api/users", userRoutes)

app.use('/',(req,res)=>{
    res.send('hello world');
})




app.listen(3000,()=>{
    connectToMongoDb()
    console.log(`Server connected on port ${PORT}`)
})