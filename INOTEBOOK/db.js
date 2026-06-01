const mongoose = require('mongoose');

// Fix the warning
mongoose.set('strictQuery', false);

// Define the function to connect to MongoDB
const connectToMongo = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/practice', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to Mongo Successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

// Export the function properly
module.exports = connectToMongo;
