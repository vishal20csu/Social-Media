import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";


const protectRoute =async (req,res,next)=>{
 
    try {
    
        const token= req.cookies.jwt; 
     
        
        if(token===""){
            res.status(401).json({error:"Unauthorized - no token provided"})
        }
        const decoded= jwt.verify(token,process.env.JWT_SECRET);


        if(!decoded){
            res.status(401).json({error: "Unauthorized - Invalid token provided"})
        }
        const user= await User.findById(decoded.userId).select("-password");

        if (!user) {
            res.status(404).json({ error: "User Not Found" });
        }
     
        req.user = user;
        // console.log(user)
       
        next()
        
    } catch (error) {

        
        console.log(error);
        res.status(500).json({error: "Internal server error from protected route "})
        
    }
}

export default protectRoute;