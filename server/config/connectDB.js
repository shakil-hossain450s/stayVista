require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`🔥 DB is connected Successfully`);
  } catch (err) {
    console.log(`❌ Err connecting to DB: ${err}`);
    process.exit(1);
  }
}

module.exports = connectDB;