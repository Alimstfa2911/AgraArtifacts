import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from "react-hot-toast";
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import './../../styles/CreateProduct.css';
const { Option } = Select;


const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");

    // Fetch all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting category');
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category); // Ensure this matches backend expectations
            productData.append("shipping", shipping);
    
            // Log FormData for debugging
            for (let [key, value] of productData.entries()) {
                console.log(key, value);
            }
    
            const { data } = await axios.post('/api/v1/product/create-product', productData);
    
            if (data?.success) {
                toast.success('Product Created Successfully');
                navigate('/dashboard/admin/products');
            } else {
                toast.error(data?.message || 'Failed to create product');
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };
    

    return (
        <Layout title={"Dashboard - Create Product"}>
                <div className="row">
                <div className="col-md-3 bg-light p-4 rounded-3 shadow-sm">
                    <AdminMenu />
                </div>
                <div className="col-md-9 bg-white p-4 mx-auto">
                        <h1 className="mb-4 ">Create Product</h1>
                        <div className='m-1 w-75' style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                            {/* Category Selection */}
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className='form-select mb-3'
                                onChange={(value) => setCategory(value)}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c.id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>

                            {/* Photo Upload */}
                            <div className="mb-3">
                                <label className='btn btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={'200px'}
                                            className='img img-responsive'
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Product Details Form */}
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder='Write a name'
                                    className='form-control'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    value={description}
                                    placeholder='Write a description'
                                    className='form-control'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={price}
                                    placeholder='Write a price'
                                    className='form-control'
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder='Write a quantity'
                                    className='form-control'
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping"
                                    size="large"
                                    className="form-select mb-3"
                                    onChange={(value) => setShipping(value)}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>

                            {/* Submit Button */}
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreate}>
                                    CREATE PRODUCT
                                </button>
                            </div>
                        </div>
                </div>
                </div>
            
        </Layout>
    );
};

export default CreateProduct;