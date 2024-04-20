import mongoose from 'mongoose';
import dotenv from 'dotenv';

// dotenv.config(); // Load environment variables from .env file

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log('DB connected');
        })
        .catch((err) => {
            console.error(`Error connecting to the database: ${err}`);
        });
}

export default dbConnect;
