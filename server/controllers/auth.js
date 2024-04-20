import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import OTPModel from "../models/Otp.js";
import nodeMailer from "nodemailer"

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// FORGOTPASSWORD

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
      // Find and check if the email from the frontend matches the email in the database
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ status: "error", message: "User not found" });
      }

      // Delete any existing OTP associated with the user's email
      await OTPModel.deleteMany({ email });

      // Generate OTP
      function generateOTP() {
          const chars = '0123456789';
          let OTP = '';

          for (let i = 0; i < 6; i++) {
              OTP += chars[Math.floor(Math.random() * chars.length)];
          }

          return OTP;
      }

      const OTP = generateOTP(); // Call the generateOTP function to get the OTP

      await OTPModel.create({ otp: OTP, email });

      const transporter = nodeMailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
          }
      });

      // Retrieve user's full name from the database
      const fullName = `${user.firstName} ${user.lastName}`;
      const currentDate = new Date().toLocaleString('en-US', { timeZone: 'GMT' });


      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Suspicious Login Attempt',
        html: `
            <p style="font-size: large;">Hi ${fullName},</p>
            <p style="font-size: large;">We noticed you just tried to reset your chatx account password on ${currentDate},to complete the resetting the password\n.Please use the six digit verification code below</p>
            <p style="font-size: xx-large;">${OTP}</p>
            <p style="font-size: large;">Thanks for helping us keep your account secure.</p>
            <p style="font-size: large;">The chatx Team</p>
            <p style="font-size: large;">Didn't do this? Be sure to change your password right away.</p>
            <p style="font-size: small; text-align: center;">This email was intended for ${fullName}. Learn why we included this.<img src="https://api.logo.com/api/v2/images?logo=logo_8a90e6f6-88c2-41d2-914e-091cb149d06c&amp;name=ChatX&amp;u=2024-03-30T16%3A57%3A01.624Z&amp;width=500&amp;height=500&amp;format=webp&amp;fit=contain&amp;margin_ratio=0.3&amp;quality=30" alt="Chatx Logo" style="display: block; max-width: 80px; max-height: 80px; margin: 0 auto 12px; border-radius: 50%;"></p>
            <p style="font-size: small; text-align: center;">© 2024 Chatx. All rights reserved.</p>
        `
    };
    
    

      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error);
              return res.status(500).json({ status: "error", message: "Failed to send email" });
          } else {
              console.log('Email sent: ' + info.response);
              return res.status(200).json({ status: "Success", message: "OTP sent to your email" });
          }
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "error", message: "Internal server error" });
  }
}



// VERIFY OTP
export const validateOtp = (req, res) => {
  const { otp } = req.body; // Fix: Removed extra .otp

  OTPModel.findOne({ otp: otp })
      .then((result) => {
         
          if (result && result.otp == otp) { // Fix: Changed res to result
              
              return res.status(200).json({ status: "Success", message: "Verified" });
          } else {
              return res.status(401).json({ status: "error", message: "Invalid Otp" });
          }
      })
      .catch((err) => res.status(500).json({ error: "Database error", message: err.message }));

}

// RESET PASSWORD
export const resetPassword = (req, res) => {
  const { password, email } = req.body;

  User.findOne({ email }).then((user) => {
      if (!user) {
          return res.json({ status: "Invalid token" });
      } else {
          bcrypt.hash(password, 10)
              .then(hash => {
                  User.updateOne({ email }, { password: hash }) // Changed to updateOne
                      .then(u => res.send({ status: "Success" })) // Changed Status to status
                      .catch(err => res.send({ status: err }));
              })
              .catch(err => res.send({ status: err }));
      }
  }).catch(err => res.send({ status: err }));
}
