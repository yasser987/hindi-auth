import mongoose from "mongoose";

const connectMongoose = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    if (connection.readyState == 1) {
      console.log("connected has been successfully");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.log("connectin false");
    return Promise.reject(error);
  }
};

export default connectMongoose;
