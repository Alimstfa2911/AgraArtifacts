import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null); // default to null
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state
  const [cart,setCart] = useCart();

  const getProductsByCat = async () => {
    try {
      console.log('Fetching products for category slug:', params?.slug); // Log slug
      const { data } = await axios.get(`/api/v1/product/product-category/${params?.slug}`);
      console.log('API Response:', data); // Log the entire API response

      if (data?.products) {
        setProducts(data?.products);
      } else {
        setError('No products found');
      }

      if (data?.category) {
        setCategory(data?.category);
      } else {
        setError('Category not found');
      }
    } catch (error) {
      setError('An error occurred while fetching data');
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      <div className="container mt-3 p-3" style={{ backgroundColor: '#dee2e6' , borderRadius:'7px' }}>
        {category && <h3 className="text-center">Category - {category?.name}</h3>}
        <h5 className="text-center">{products?.length} result(s) found</h5>
        <hr />
        <div className="card m-3 p-3"
                style={{
                    borderRadius: "5px", // Adds border-radius to the card
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Adds a subtle shadow for better aesthetics
                }}>
                <div className="d-flex flex-wrap">
                {products.length === 0 ? (
                    <p>No products available</p>
                ) : (
                    products?.map((p) => (
                    <div className="card m-2 p-3 product-card" style={{ width: '24rem', backgroundColor: '#f8f9fa' }} key={p._id}>
                        <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        style={{ width: "100%", height: "500px", objectFit: "cover" }}
                        />
                        <div className="card-body" style={{ backgroundColor: '#dee2e6', borderRadius: '7px' }}>
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0, 30)}...</p>
                        <p className="card-text">$ {p.price}</p>
                        <div>
                            <button className="btn btn-outline-primary" onClick={() => navigate(`/product/${p.slug}`)}>
                            More details
                            </button>
                            <button
                            className="btn btn-outline-success ms-1"
                            onClick={() => {
                                const existingProductIndex = cart.findIndex(item => item._id === p._id);
                                if (existingProductIndex !== -1) {
                                const updatedCart = [...cart];
                                if (updatedCart[existingProductIndex].noOfItems < updatedCart[existingProductIndex].quantity) {
                                    updatedCart[existingProductIndex].noOfItems += 1;
                                    updatedCart[existingProductIndex].price += p.price;
                                    setCart(updatedCart);
                                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                                    toast.success('Item added to Cart');
                                } else {
                                    toast.error('No more element is present');
                                }
                                } else {
                                const updatedCart = [...cart, { ...p, noOfItems: 1 }];
                                setCart(updatedCart);
                                localStorage.setItem('cart', JSON.stringify(updatedCart));
                                toast.success('Item added to Cart');
                                }
                            }}
                            >
                            Add to Cart
                            </button>
                        </div>
                        </div>
                    </div>
                    ))
                )}
                </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
