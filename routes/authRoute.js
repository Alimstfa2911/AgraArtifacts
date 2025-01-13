import express from 'express';
import {
    registerController,
    loginController , 
    testController, 
    forgetPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController,
    
} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { getProductController } from '../controllers/productController.js';


//router object
const router =  express.Router()

//routing
//REGISTER || METHOD POST
router.post('/register', registerController);

//LOGIN ||post
router.post('/login',loginController);


//Forget password || POST
router.post('/forget-password',forgetPasswordController);

//test routes
router.get('/test',requireSignIn , isAdmin, testController);


//protected route
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});

//protected admin route
router.get('/admin-auth',requireSignIn, isAdmin ,(req,res)=>{
    res.status(200).send({ok:true});
});

//update profile
router.put('/profile', 
    requireSignIn, 
    updateProfileController ,(req,res)=> {
    res.status(200).send({ok:true});
});


//orders
router.get('/orders',
    requireSignIn,
    getOrdersController
);

//all-orders
router.get('/all-orders',
    requireSignIn,
    isAdmin,
    getAllOrdersController
);

//order status update
router.put("/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
)





export default router;