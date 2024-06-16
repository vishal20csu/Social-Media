import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signupUser = async (req,res)=>{
    try{
        const {fullName,userName, password, confirmPassword,gender} = req.body;
        if(password!==confirmPassword){
            return res.status(400).json({error:"passwords do not match"})
        }
        const user= await User.findOne({userName})
        if(user){
            return res.status(400).json({error:"username is already taken"})
        }
     

        // HASH PASSWORD HERE
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        const boyProfilePic= `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic= `https://avatar.iran.liara.run/public/girl?username=${userName}`;
       
        const newUser= new User({
            fullName,
            userName,
            password:hashedPassword,
            gender,
            profilePic:gender==='male' ? boyProfilePic : girlProfilePic
        })
  

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                userName:newUser.userName,
                profilePic:newUser.profilePic
            })
        }else{
            res.status(400).json({error: "Invalid user data"});

        }
       


    }catch(error){
        console.log(`Error in sign up controller ${error}`)
        res.status(500).json({error:"Internal Server Error"})

    }
  
}


export const loginUser = async (req,res)=>{
    try {
        const {userName,password}= req.body;
        const user= await User.findOne({userName});
        const isPasswordCorrect= await bcrypt.compare(password,user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid Username or Password"});
        }
        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,


        })


        
    } catch (error) {
        console.log(`Error in sign up controller ${error}`)
        res.status(500).json({error:"Internal Server Error"})
    }
}


export const logoutUser =(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
        
    } catch (error) {
        console.log(`Error in logout controller ${error}`)
        res.status(500).json({error:"Internal Server Error"})

    }
}