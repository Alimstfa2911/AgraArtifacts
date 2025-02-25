import express from "express";
import colors from "colors";
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from "cors";
import cartRoutes from './routes/cartRoutes.js';
import otpRoutes from './routes/otpRoutes.js';


//configure env
dotenv.config();

//database config
connectDB();

//rest object

const app = express()

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);
app.use('./routes/cartRoutes',cartRoutes);

// // OTP Routes
app.use('/api/v1/auth', otpRoutes);




//rest api

app.get('/',(req,res)=>{
    res.send("<h1>Welcome to ecommerce app</h1>")
})

//port

const PORT= process.env.PORT|| 8000;

//RUN LISTEN

app.listen(PORT,()=>{
    console.log(`Server running on ${process.env.DEV_MODE} mode on ${PORT}`);
});