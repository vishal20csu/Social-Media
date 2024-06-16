import User from "../models/user.model.js" 
export const getUserForSidebar = async (req,res)=>{
    try {
        const loggedInUserId= req.user._id;
        const filteredUsers= await User.find({id:{$ne:loggedInUserId}}).select("-password"); 

        res.status(200).json(filteredUsers);

        
    } catch (error) {
        res.status(500).json({erorr: "Internal Server Error"});
        
    }

}