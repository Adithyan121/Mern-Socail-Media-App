import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otp:Number,
    email:String,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 // TTL (Time-To-Live) in seconds for the OTP document
    }
}, {
    collection: 'otp' // Specify the collection name here
});

const OTPModel = mongoose.model('OTP', otpSchema);

export default OTPModel;
