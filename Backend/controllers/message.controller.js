
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js"
import { getReceiverSocketId,io } from "../socket/socket.js";
export const sendMessage= async (req,res)=>{
    try {
        
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId= req.user._id;

        
        let conversation= await Conversation.findOne({
            participants:{$all : [senderId,receiverId]},
            
        })
      
        if(!conversation){
            await Conversation.create({
                participants:[senderId,receiverId]
            })
        }
      
      
        
        const newMessage= new Message({
            senderId:senderId,
            receiverId:receiverId,
            message:message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        
        // await conversation.save(); take 1 sec 
        // await newMessage.save(); wait and then take 1 sec 
        // this will run in parallel
        await Promise.all([ conversation.save(),newMessage.save()])

        // socket.io functionality
      
         const receiverSocketId = getReceiverSocketId(receiverId)
         if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
         }

        res.status(201).json(newMessage);
   

        
    } catch (error) {
       
        res.status(500).json({error:"Send Message error"})
        
    }
}

export const getMessage= async (req,res)=>{
 
    try {
        const {id:userToChatId} = req.params;
        const senderId= req.user._id;
        
        const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages");
        
    
        if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;
		res.status(200).json(messages);
        
    } catch (error) {
        
        res.status(500).json({error:"Unable To Get Message"})
        
    }
}