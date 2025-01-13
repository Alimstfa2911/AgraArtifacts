import nodemailer from 'nodemailer';
import connectDB from './../config/db.js'; // Database connection
import Otp from '../models/otpModel.js'; // Adjust the path based on your folder structure

// Generate a random 6-digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

// Save OTP to the database with expiration (e.g., 10 minutes)
const saveOtpToDB = async (email, otp) => {
  try {
    const expirationTime = Date.now() + 10 * 60 * 1000; // 10 minutes
    await Otp.updateOne(
      { email },
      { otp, expiresAt: new Date(expirationTime) },
      { upsert: true }
    );
    console.log('OTP saved successfully for email:', email);
  } catch (error) {
    console.error('Error in saveOtpToDB:', error);
    throw error;
  }
};

// Send OTP via email using Nodemailer
const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'mdmustafaali29112000@gmail.com', // Update with your email
      pass: 'scgj ciws afne iqba', // Update with your email password
    },
  });

  const mailOptions = {
    from: 'mdmustafaali29112000@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

// Reset password in the database
const resetPassword = async (email, newPassword) => {
  const db = await connectDB();
  await db.collection('users').updateOne(
    { email },
    { $set: { password: newPassword } }
  );
  console.log('Password reset successfully for email:', email);
};

// Combined function to handle sending OTP and verifying OTP for resetting password
export const handleForgetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  // Step 1: Check if the request is to send OTP or verify OTP
  if (otp) {
    // Verify OTP and reset password
    try {
      const db = await connectDB();
      const storedOtp = await Otp.findOne({ email });

      if (!storedOtp) {
        return res.status(400).json({ success: false, message: 'No OTP sent for this email' });
      }

      // Check if OTP is valid and has not expired
      if (storedOtp.otp === otp) {
        if (Date.now() > storedOtp.expiresAt) {
          return res.status(400).json({ success: false, message: 'OTP expired' });
        }

        // OTP is valid, reset the password
        await resetPassword(email, newPassword);
        return res.status(200).json({ success: true, message: 'Password has been reset successfully' });
      } else {
        return res.status(400).json({ success: false, message: 'Invalid OTP' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Error resetting password. Please try again.' });
    }
  } else {
    // Send OTP for password reset
    const otp = generateOtp();
    try {
      // Save OTP to the database
      await saveOtpToDB(email, otp);
      console.log('OTP saved to database for email:', email);

      // Send OTP email
      await sendOtpEmail(email, otp);
      console.log('OTP sent to email:', email);

      res.status(200).json({ success: true, message: 'OTP sent to your email' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to send OTP. Please try again.' });
    }
  }
};
