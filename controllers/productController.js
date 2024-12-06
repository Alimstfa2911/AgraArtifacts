import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from 'fs';
import categoryModel from '../models/categoryModel.js';
import braintree from "braintree";
import orderModel from "../models/categoryModel.js";
import dotenv from "dotenv";

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment:braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


export const createProductController = async (req,res) =>{
    try{
        const {
            name,
            description,
            price,
            category,
            quantity,
        } = req.fields;
        const {photo} = req.files;

        //Validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is Required'})
            
            case !description:
                return res.status(500).send({error:'Description is Required'})
            
            case !price:
                return res.status(500).send({error:'Price is Required'})
            
            case !category:
                return res.status(500).send({error:'Category is Required'})
            
            case !quantity:
                return res.status(500).send({error:'Quantity is Required'})
            
            case !photo && photo.size > 1000000:
                return res.status(500).send({error:'Photo is Required and should be less than 1mb'})
            
        }


        const products = new productModel({...req.fields,slug:slugify(name)});
        if(photo){
            products.photo.data =  fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:"Product Created Successfully",
            products,
        });

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in creating product'
        })
    }
};


//get all products

export const getProductController = async (req,res) =>{
    try{
        const products = await productModel
        .findById({slug: req.params.slug._id})
        .populate('category')
        .select("-photo")
        .limit(12)
        .sort({createdAt:-1})
        res.status(200).send({           
            success:true,
            CountTotal: products.length,
            message:"AllProducts",
            products,        
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:'false',
            error:error.message,
            message:'Error in getting products'
        })
    }
};

//get single product

export const getSingleProductController = async (req,res) =>{
    try{
        const product = await productModel
        .findOne({slug: req.params.slug})
        .select("-photo")
        .populate("category");
        res.status(200).send({
            success:true,
            message:"Single Product Fetched",
            product,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in getting Products',
            error
        })
    }
};

//photo
export const productPhotoController = async (req,res) =>{
    try{
        const product =  await productModel
        .findById(req.params.pid)
        .select("photo");

        if(product.photo.data){
            res.set("Content-type",product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            
            message:'Error in getting photo',
            error
        })
    }
}

//delete Product

export const deleteProductController = async (req,res) => {
    try{
        await productModel.findByIdAndDelete(req.params.pid)
        .select("-photo");
        res.status(200).send({
            success:true,
            message:"Product Deleted Successfully",
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in deleting message'
        })
    };
};


//update product
export const updateProductController = async (req,res) => {
    try{
        const {
            name,
            description,
            price,
            category,
            quantity,
        } = req.fields;
        const {photo} = req.files;

        //Validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is Required'})
            
            case !description:
                return res.status(500).send({error:'Description is Required'})
            
            case !price:
                return res.status(500).send({error:'Price is Required'})
            
            case !category:
                return res.status(500).send({error:'Category is Required'})
            
            case !quantity:
                return res.status(500).send({error:'Quantity is Required'})
            
            case !photo && photo.size > 1000000:
                return res.status(500).send({error:'Photo is Required and should be less than 1mb'})
            
        }


        const products = await productModel
        .findByIdAndUpdate(
            req.params.pid,
            {...req.fields,
                slug:slugify(name)},
                {new:true}
        )
        if(photo){
            products.photo.data =  fs.readFileSync(photo.path)
            products.photo.content = photo.type
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:"Product update Successfully",
            products,
        });

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in Updating product'
        })
    }
};

//filters 

export const productFiltersController = async (req,res) => {
    try{
        const {checked,radio} = req.body;
        let args = {};
        if(checked.length > 0 ) args.category = checked;
        if(radio.length) args.price = {$gte:radio[0],$lte:radio[1]};
        const products = await productModel.find(args)
        res.status(200).send({
            success:true,
            products,
        });
    }catch(error){
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error while filtering products",
            error
        });
    };
};

//product Count

export const productCountController =async (req,res) =>{
    try{
        const total = await productModel.find({})
        .estimatedDocumentCount();
        res.status(200).send({
            success:true,
            total,
        });
    }catch(error){
        console.log(error);
        res.status(400).send({
            message:'Error in product',
            error,
            success:false
        })
    }
};

//product list based on page

export const productListController = async (req,res) => {
    try{
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page-1)*perPage)
            .limit(perPage)
            .sort({createdAt:-1});
        res.status(200).send({
            success:true,
            products,
       });
    }catch(error){
        console.log(error);
        res.status(400).send({
            success:false,
            message:'Error in page cntrl',
            error
        })
    };
};

//search product

export const searchProductController = async (req,res) =>{
    try{
        const {keyword} = req.params;
        const results = await productModel
        .find({
            $or:[
                {name:{$regex : keyword , $options:"i"}},
                {description:{$regex : keyword , $options:"i"}}
            ]
        }).select("-photo");
        res.json(results);
    }catch(error){
        console.log(error);
        res.status(400).send({
            success:false,
            message:'Error in search Product API',
            error
        })
    }
};

//similar product 

export const relatedProductController = async (req,res) =>{
    try{
        const {pid,cid} = req.params;
        const products = await productModel.find({
            category:cid,
            _id:{$ne:pid}
        }).select("-photo")
            .limit(3)
            .populate("category")
        res.status(200).send({
            success:true,
            products,
        });
    }catch(error){
        console.log(error);
        res.status(400).send({
            success:false,
            message:'Error while getting related product',
            error
        })
    }
};


//get product by categoryasync 
export const productCategoryControler = async (req,res) => {
    try{
        const category =  await categoryModel.findOne({slug:req.params.slug});
        const products = await productModel.find({category}).populate('category');
        res.status(200).send({
            success:true,
            category,
            products,
        });
    }catch(error){
        console.log(error);
        res.status(400).send({
            success:false,
            error,
            message:'Error While Getting product'
        });
    }
};


//payment gateway api
//token
export const braintreeTokenController = async (req,res) => {
    try{
        gateway.clientToken.generate({},function(err,response ){
            if(err){
                res.status(500).send(err);
            }else{
                res.send(response);
            }
        });
    }catch(error){
        console.log(error);
    }
};

//payment
export const brainTreePaymentController = async (req,res) => {
    
        try{
            const {cart,nonce} = req.body;
            let total = 0;
            cart.map((i)=>{
                total+=i.price
            });
            let newTransaction = gateway.transaction.sale({
                amount:total,
                paymentMethodNonce:nonce,
                options:{
                    submitForSettlement:true
                },
            },
            function(error,result){
                if(result){
                    const order = new orderModel({
                        products:cart,
                        payment:result,
                        buyer:req.user._id
                    }).save();
                    res.json({ok:true});
                }else{
                    res.status(500).send(error);
                }
            }
        )
        }catch(error){
            console.log(error);
        }
    
}; 


