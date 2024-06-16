import mongoose from 'mongoose';

mongoose.set('strictQuery', true);
const connectToMongoDb = async()=>{
    try {
       await mongoose.connect(process.env.Mongo_Db_Url);
       console.log("database connected")
        
    } catch (error) {
        console.log(`Error Encountered ${error}`)
    }

}
export default connectToMongoDb;