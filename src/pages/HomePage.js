import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from "../components/Routes/Prices.js";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import "../styles/AuthStyles.css";
import "../styles/Homepage.css";
import TypingEffect from './TypingEffect.js';

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useState();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // GET ALL CAT
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/product-count');
      if (data?.success) {
        setTotal(data?.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load More
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter(c => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio]);

  // Get filtered products
  const filterProducts = async () => {
    try {
      const { data } = await axios.post('/api/v1/product/product-filters', { checked, radio });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const texts = ["Welcome to AgraArtifacts...", "Enjoy seamless shopping experience for your home...!"];

  // Check if any filter is applied
  const isFiltered = checked.length > 0 || radio.length > 0;

  return (
    <Layout title={'All Products - Best Offer'}>
      <div className="container-fluid bg-info">
        <div className="row ">
          {/* Filters Section */}
          <div className="col-md-2 filters bg-light p-3" style={{ position: 'sticky', top: '20px', height: 'calc(100vh - 20px)', overflowY: 'auto', paddingRight: '15px' }}>
            <div className="d-flex flex-column">
              {/* Filter by Price Section */}
              <div className="filter-price" style={{ position: 'sticky', top: '0', marginBottom: '20px' }}>
                <h4 className="text-center mt-4">Price</h4>
                <div className="d-flex flex-column">
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {Prices?.map((p) => (
                      <div key={p._id}>
                        <Radio value={p.array}>{p.name}</Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
              </div>

              {/* Filter by Category Section */}
              <div className="filter-category" style={{ position: 'sticky', top: '100px' }}>
                <h4 className="text-center ">Category</h4>
                <div className="d-flex flex-column m-3">
                  {categories?.map((c) => (
                    <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                      {c.name}
                    </Checkbox>
                  ))}
                </div>
              </div>

              {/* Reset Filters Button */}
            <div className="d-flex flex-column mt-3">
              <button
                type="button"
                className="btn"
                onClick={() => window.location.reload()}
                style={{
                  height:'33px',
                  backgroundColor: '#e74c3c', // Elegant red color
                  color: 'white', // White text
                  border: 'none', // No border for a clean look
                  borderRadius: '20px', // Rounded corners
                  padding: '5px 5px', // Spacing for the button
                  // fontWeight: 'bold', // Bold text for emphasis
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease', // Smooth hover effects
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                Reset Filters
              </button>
            </div>

            </div>
          </div>

          {/* Products Section */}
          <div className="col-md-10 bg-white p-4 shadow-sm">
            {/* Conditionally render TypingEffect and Carousel only when no filters are applied */}
            {!isFiltered && (
              <>
                <div>
                  <h1 className="text-center">
                    <TypingEffect texts={texts} typingSpeed={100} pauseTime={1500} />
                  </h1>
                </div>

                {/* Carousel Banner */}
                <div
                    id="productCarousel"
                    className="carousel slide mb-3"
                    data-bs-ride="carousel"
                    style={{
                      backgroundColor: '#7D8085',
                      padding: '5px',
                      borderRadius: '5px'
                    }}
                  > 
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src="../../../images/b3.jpg" className="d-block w-100" alt="Banner 1" style={{ height: '300px' }} />
                    </div>
                    <div className="carousel-item">
                      <img src="../../../images/b6.jpg" className="d-block w-100" alt="Banner 2" style={{ height: '300px' }} />
                    </div>
                    <div className="carousel-item">
                      <img src="../../../images/i3.jpg" className="d-block w-100" alt="Banner 2" style={{ height: '300px' }} />
                    </div>
                    {/* Add more carousel items here */}
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </>
            )}

            {/* Product List */}
            <div className="d-flex flex-wrap">
              {products.length === 0 ? (
                <p>No products available</p>
              ) : (
                products?.map((p) => (
                  <div className="card m-2 p-2 product-card" style={{ width: '24rem', backgroundColor: '#f8f9fa' }} key={p._id}>
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

            {/* Pagination Section */}
            <div className="m-2 p-3 text-center">
              {products && products.length < total && (
                <button className="btn btn-outline-danger" onClick={(e) => { e.preventDefault(); setPage(page + 1); }}>
                  {loading ? 'Loading...' : 'Load More...'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
