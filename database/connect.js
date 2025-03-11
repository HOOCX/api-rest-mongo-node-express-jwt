
import mongoose from "mongoose";

// Connect to MongoDB
try {
     await mongoose.connect(process.env.URI_MONGO);
     console.log("Connected to MongoDB");
    
 } catch (error) {
     console.error("Failed to connect to MongoDB", error); 
    //  if (error.name === 'MongooseServerSelectionError') {
    //     console.log(error.reason.servers);
    //   }
      process.exit(1);
      
    
 };
// Create a new schema for our documents
