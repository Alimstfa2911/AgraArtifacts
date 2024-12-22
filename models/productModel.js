import mongoose from "mongoose";

const productSchema = new mongoose.Schema({   
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.ObjectId,
        ref:'Category',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    //storing photo with the help of mongodb bcs cloudinary returns string
    photo:{
        data:Buffer,
        contentType:String
    },
    shipping:{
        type:Boolean,
    },
    noOfItems:{
        type:Number
    }
},{timeStamps:true}
);

export default mongoose.model(
    'Products',productSchema
);