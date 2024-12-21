import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from "../components/Routes/Prices.js";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import "../styles/AuthStyles.css";

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
    if (!checked.length || !radio.length){
      getAllProducts();
      //eslint-disable-next-line
      
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


  return (
    <Layout title={'All Products - Best Offer'}>
        <div className="container-fluid bg-info">
          <div className="row mt-0">
            
            {/* Filters Section */}
            <div
              className="col-md-2 filters bg-light p-3"
              style={{
                position: 'sticky',
                top: '20px',
                height: 'calc(100vh - 20px)',
                overflowY: 'auto',
                paddingRight: '15px',
              }}
            >
              <div className="d-flex flex-column">
                {/* Filter by Price Section */}
                <div
                  className="filter-price"
                  style={{ position: 'sticky', top: '0', marginBottom: '20px' }}
                >
                  <h4 className="text-center mt-4">Price</h4>
                  <div className="d-flex flex-column">
                    <Radio.Group onChange={(e) => setRadio(e.target.value)}
                      
                      >
                      {Prices?.map((p) => (
                        <div key={p._id}>
                          <Radio value={p.array}>{p.name}</Radio>
                        </div>
                      ))}
                    </Radio.Group>
                  </div>
                </div>

                {/* Filter by Category Section */}
                <div
                  className="filter-category"
                  style={{ position: 'sticky', top: '100px' }}
                >
                  <h4 className="text-center">Category</h4>
                  <div className="d-flex flex-column">
                    {categories?.map((c) => (
                      <Checkbox
                        key={c._id}
                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                      >
                        {c.name}
                      </Checkbox>
                    ))}
                  </div>
                </div>

                {/* Reset Filters Button */}
                {/* Reset Filters Button */}
                  <div className="d-flex flex-column mt-3">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={()=>window.location.reload()}
                    >
                      Reset
                    </button>
                  </div>

              </div>
            </div>

            {/* Products Section */}
            <div
              className="col-md-10"
              style={{
                backgroundColor: '#e9ecef',
                padding: '0',
              }}
            >
              {/* Carousel Banner */}
            <div
                id="productCarousel"
                className="carousel slide mb-3"
                data-bs-ride="carousel"
                style={{
                  backgroundColor: '#7D8085',
                  padding: '12px',
                
                }}
                >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="../../../images/b1.jpg"
                      className="d-block w-100"
                      alt="Banner 1"
                      style={{
                        height:'270px',
                        
                      }}
                    />
                  </div>
                  <div className="carousel-item active">
                    <img
                      src="../../../images/b6.jpg"
                      className="d-block w-100"
                      alt="Banner 2"
                      style={{
                        height:'270px'
                      }}
                    />
                  </div>
                  <div className="carousel-item ">
                    <img
                      src="../../../images/b3.jpg"
                      className="d-block w-100"
                      alt="Banner 3"
                      style={{
                        height:'270px'
                      }}
                    />
                  </div>
                  <div className="carousel-item ">
                    <img
                      src="../../../images/b4.webp"
                      className="d-block w-100"
                      alt="Banner 4"
                      style={{
                        height:'270px'
                      }}
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#productCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#productCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>

              {/* Product List */}
              <h1
                className="text-center"
                style={{
                  fontSize: '2rem',
                  color: '#333',
                  marginTop: '0',
                }}
              >
                All Products List
              </h1>
              <div className="d-flex flex-wrap">
                {products.length === 0 ? (
                  <p>No products available</p>
                ) : (
                  products?.map((p) => (
                    <div
                      className="card m-2 p-1 product-card"
                      style={{
                        width: '25rem',
                        backgroundColor: '#f8f9fa',
                      }}
                      key={p._id}
                    >
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                      <div
                        className="card-body"
                        style={{ backgroundColor: '#f6f9f6' }}
                      >
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">
                          {p.description.substring(0, 30)}...
                        </p>
                        <p className="card-text">$ {p.price}</p>
                        <div>
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => navigate(`/product/${p.slug}`)}
                          >
                            More details
                          </button>
                          <button
                            className="btn btn-outline-success ms-1"
                            onClick={() => {
                              setCart([...cart, p]);
                              localStorage.setItem(
                                'cart',
                                JSON.stringify([...cart, p])
                              );
                              toast.success('Item added to Cart');
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
                  <button
                    className="btn btn-outline-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
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
