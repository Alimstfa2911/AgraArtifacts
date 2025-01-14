import nodemailer from 'nodemailer';
import connectDB from './../config/db.js'; 
import Otp from '../models/otpModel.js'; 
import dotenv from 'dotenv';

dotenv.config();




export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

export const saveOtpToDB =  async (email, otp) => {
  
    const expirationTime = Date.now() + 10 * 60 * 1000; // 10 minutes
    await Otp.updateOne(
      { email },
      { otp, expiresAt: new Date(expirationTime) },
      { upsert: true }
    );
    console.log('OTP saved successfully for email:', email);
  
};


// Get OTP from the database
export const getOtpFromDB = async (email) => {
  const db = await connectDB();
  return await db.collection('otps').findOne({ email });
};

// Send OTP via email using Nodemailer
export const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "mdmustafaali29112000@gmail.com",
      pass: process.env.pass , 
    },
  });

  const mailOptions = {
    from: process.env.email, 
    to: email, 
    subject: 'AgraArtifacts - Verify Your OTP for Registration', 
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; border: 1px solid #ccc; padding: 20px; border-radius: 10px; max-width: 500px; margin: auto;">
        <h2 style="color: #4CAF50;">AgraArtifacts</h2>
        <p style="font-size: 16px; color: #333;">
          Thank you for registering with AgraArtifacts. Please use the OTP below to verify your email address:
        </p>
        <h3 style="font-size: 24px; color: #FF5722;">${otp}</h3>
        <p style="font-size: 14px; color: #777;">
          This OTP is valid for 10 minutes. If you did not request this, please ignore this email.
        </p>
        <p style="font-size: 14px; color: #333;">Best regards,<br>AgraArtifacts Team</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Send OTP Controller
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    console.log("Received email in request:", email); // Log the email received
    const otp = generateOtp();
    console.log("Generated OTP:", otp); // Log the OTP

    await saveOtpToDB(email, otp);
    console.log("OTP saved to database"); // Confirm OTP save

    await sendOtpEmail(email, otp);
    console.log("OTP sent to email:", email); // Confirm email sent

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in /sendOtp endpoint:", error); // Log detailed error
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};


// Register Controller
export const register = async (req, res) => {
  const { email, otp, name, password } = req.body;

  if (!email || !otp || !name || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const db = await connectDB();
    const savedOtp = await getOtpFromDB(email);

    if (!savedOtp) {
      return res.status(400).json({ success: false, message: 'No OTP sent for this email' });
    }

    if (Date.now() > savedOtp.expiresAt) {
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }

    if (savedOtp.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // Save user to database
    await db.collection('users').insertOne({ email, name, password });

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
};



// Verify Email Controller
export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required' });
  }

  try {
    const db = await connectDB();
    const savedOtp = await getOtpFromDB(email);

    if (!savedOtp) {
      return res.status(400).json({ success: false, message: 'No OTP sent for this email' });
    }

    if (Date.now() > savedOtp.expiresAt) {
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }

    if (savedOtp.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    res.status(200).json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ success: false, message: 'Email verification failed' });
  }
};

export const sendForgetPasswordOtp = async (req, res) => {
  const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }
  try {
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await saveOtpToDB(email, otp);

    await sendOtp(email, otp);

    res.status(200).json({ success: true, message: 'OTP sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error sending OTP. Please try again.' });
  }
};

export const verifyForgetPasswordOtp = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const storedOtp = await getOtpFromDB(email);

    if (storedOtp === otp) {
      // OTP is valid, reset the password
      await resetPassword(email, newPassword);

      // Send success response
      res.status(200).json({ success: true, message: 'Password has been reset successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error resetting password. Please try again.' });
  }
};

