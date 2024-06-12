const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb is connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`error ${error.message}`);
  }
};

module.exports = connectDb;
