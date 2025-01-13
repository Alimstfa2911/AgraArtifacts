import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: {},
        required: true,
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      verificationCode: String,
      role: {
        type: Number,
        default: 0,
      },
      otp: {
        type: String,
      },
      otpExpiresAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  );
  
export default mongoose.model('Users', userSchema);
  