import Layout from '../components/Layout/Layout';
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { useSearch } from '../context/search';
import toast from 'react-hot-toast';
import TypingEffect from './TypingEffect.js';
import "../styles/Homepage.css";

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            if (auth?.token && auth?.user?._id) {
                try {
                    const { data } = await axios.get(`/api/v1/cart/${auth.user._id}`);
                    setCart(data?.items);
                } catch (error) {
                    console.error('Failed to fetch cart:', error);
                }
            }
        };
        fetchCart();
    }, [auth]);

    

    const totalPrice = () => {
        let total = 0;
        cart?.map(item => { total = total + item.price });
        return total.toLocaleString("en-US", { style: "currency", currency: "USD" });
    }

    const removeCartItem = async (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
            await axios.post(`/api/v1/cart/${auth.user._id}`, { items: myCart });
        } catch (error) {
            console.log(error);
        }
    };

    const getToken = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/braintree/token');
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getToken();
    }, [auth?.token]);

    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post('/api/v1/product/braintree/payment', { nonce, cart });
            setLoading(false);
            localStorage.removeItem('cart');
            setCart([]);
            navigate('/dashboard/user/orders');
            toast.success("Payment completed");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    


    return (
        <Layout>
            <div className="container">
                

                <div className="row">
                    {/* Left Side - Cart Items */}
                    

                    <div className="col-md-8 bg-light ">
                        <div className="row">
                            <div className="col-md-12">
                                {/* <h1 className='text-center bg-light p-2'>
                                    {`Hello ${auth?.token && auth?.user.name}`}
                                </h1> */}
                                <div>
                                    <h1 className="text-center bg-light p-2">
                                        <TypingEffect texts={[`Hello.. ${auth?.token && auth?.user.name}`]} typingSpeed={100} pauseTime={1500} />
                                    </h1>
                                    <hr />
                                </div>
                                

                                <h4 className='text-center '>
                                    {cart?.length > 0
                                        ? `You have ${cart.length} items in your Cart.  ${auth?.token ? "" : " Please Login to CheckOut"}`
                                        : " Your Cart Is Empty "}
                                </h4>
                            </div>
                        </div>
                        <div >
                            {cart?.map((p) => (
                                <div className="row mb-5 m-3 p-3 card flex-row" key={p._id}>
                                    
                                        <div className="col-md-5 ">
                                            <img
                                                src={`/api/v1/product/product-photo/${p._id}`}
                                                className="card-img-top"
                                                alt={p.name}
                                            />
                                        </div>
                                        <div className="col-md-7 " >
                                            <h4>{p.name}</h4>
                                            <hr />
                                            <p>{p.description}</p>
                                            <p><b>NoOfItems : </b>{p.noOfItems}</p>
                                            <p><b>Price : </b> {p.price}</p>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => removeCartItem(p._id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    
                                    
                                </div>
                            ))}
                        </div>
                    </div>

                    

                    {/* Right Side - Cart Summary */}
                    <div className="col-md-4 bg-light p-5">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total : {totalPrice()}</h4>

                        {auth?.user?.address ? (
                            <>
                                <div className="mb-2">
                                    <h4>Current Address : {auth?.user?.address} </h4>
                                    <button
                                        className='btn btn-outline-warning'
                                        onClick={() => navigate('/dashboard/user/profile')}
                                    >
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {auth?.token ? (
                                    <button
                                        className='btn btn-outline-warning'
                                        onClick={() => navigate('/dashboard/user/profile')}
                                    >
                                        UPDATE ADDRESS
                                    </button>
                                ) : (
                                    <button
                                        className='btn btn-outline-warning'
                                        onClick={() => navigate('/login', { state: '/cart' })}
                                    >
                                        PLEASE Login to Checkout
                                    </button>
                                )}
                            </div>
                        )}

                        <div className="mt-2">
                            {!clientToken || !cart?.length || !auth?.token ? ("") : (
                                <>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow: 'vault',
                                            }
                                        }}
                                        onInstance={instance => setInstance(instance)}
                                    />
                                    <button
                                        className="btn btn-primary"
                                        onClick={handlePayment}
                                        disabled={loading || !instance || !auth?.user?.address}
                                    >
                                        {loading ? "Processing" : "Make Payment"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;