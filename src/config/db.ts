import mongoose from 'mongoose';

// const USER_MONGODB: string = "david_hombe";
// const PASS_MONGODB:string = "W9JCIrcDNHs2SzqP";
// const MONGO_CLOUD_URI = "mongodb+srv://david_hombe:W9JCIrcDNHs2SzqP@cluster0.m31wdv8.mongodb.net/api_user_v1?retryWrites=true&w=majority"; 
const MONGO_LOCAL_URI = "mongodb://127.0.0.1:27017/devs_api";

// const connectDatabase = () => {
//   mongoose.set('strictQuery', true);
//   mongoose
//     .connect(MONGO_CLOUD_URI, {
//       retryWrites: true,        
//       w: 'majority',
//     })
//     .then((con) => {
//       console.log(`🎲 MongoDb Database connecteted with HOST: ${con.connection.host}`);
//     })
//     .catch((error: Error) =>
//       console.error('❌ MongoDB connection failed:', error.message)
//     );
// };

const connectDatabase = () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(MONGO_LOCAL_URI, {
    retryWrites: true,
          w: 'majority',
  }).then(con => {
      console.log(`🎲 MongoDb Database connect with HOST: ${con.connection.host}`);
  }).catch((error) => console.error("❌ MongoDB connection failed:", error.message));

}


export default connectDatabase;