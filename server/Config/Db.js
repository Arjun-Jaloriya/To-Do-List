const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/TO-DO-LIST");
    console.log("connected to mongoDB");
  } catch (error) {
    console.log("error connecting to mongoDB", error);
  }
};
module.exports = connectDB;
