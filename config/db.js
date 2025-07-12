const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected");
    } catch (err) {
        console.log("Failed to connect to MongoDB ")
        console.log("====================================")
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

