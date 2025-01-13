import express from 'express';
import { 
  verifyForgetPasswordOtp, 
  sendForgetPasswordOtp, 
  register, 
  verifyEmail, 
  sendOtp 
} from './../controllers/otpController.js';

import { handleForgetPassword } from '../controllers/passwordResetController.js';


const otpRoutes = express.Router(); // Corrected to use otpRoutes

// Route to handle user registration
otpRoutes.post('/register', register);

// Route to verify the OTP during email verification
otpRoutes.post('/verifyemail', verifyEmail);

// Route to send OTP
otpRoutes.post('/sendOtp', sendOtp);

// Route to send OTP for resetting password
otpRoutes.post('/send-forget-password-otp', sendForgetPasswordOtp); // Fixed: Using otpRoutes

// Route to verify OTP and reset password
otpRoutes.post('/verify-forget-password-otp', verifyForgetPasswordOtp); // Fixed: Using otpRoutes



// Route to handle sending OTP and verifying OTP for password reset
otpRoutes.post('/forget-password', handleForgetPassword);

export default otpRoutes;
