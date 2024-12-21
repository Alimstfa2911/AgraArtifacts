import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import { Row, Col } from 'antd';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get('/api/v1/auth/orders');
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    return (
        <Layout title={'Your Orders'}>
            <div className="container-fluid orders-page-background" style={{ minHeight: '100vh' }}>
                <Row gutter={[16, 16]} style={{ minHeight: 'calc(100vh - 130px)' }}>
                    {/* Left Sidebar - User Menu */}
                    <Col span={6} style={{ background: '#f0f2f5', padding: '10px' }}>
                        <UserMenu />
                    </Col>

                    {/* Right Content Area - Orders Details */}
                    <Col span={18} style={{ background: '#ffffff', padding: '20px' }}>
                        <h1 className="orders-header">All Orders</h1>
                        <h1>Hello</h1>

                        {orders?.map((o, i) => (
                            <div className="order-card" key={i} style={{ marginBottom: '20px' }}>
                                <table className="order-table" style={{ width: '100%', marginBottom: '15px' }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Buyer</th>
                                            <th scope="col">Order Time</th>
                                            <th scope="col">Payment</th>
                                            <th scope="col">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{o?.status}</td>
                                            <td>{o?.buyer?.name}</td>
                                            <td>{moment(o?.createdAt).fromNow()}</td>
                                            <td>{o?.payment.success ? "Success" : "Failed" }</td>
                                            <td>{o?.products?.length}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* Product Details */}
                                <div className="product-card" style={{ marginTop: '15px' }}>
                                    {o?.products?.map((p) => (
                                        <div className="product-card" key={p._id} style={{ display: 'flex', marginBottom: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '8px' }}>
                                            <div className="product-img" style={{ marginRight: '20px' }}>
                                                <img
                                                    src={`/api/v1/product/product-photo/${p._id}`}
                                                    className="card-img-top"
                                                    alt={p.name}
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div className="product-details">
                                                <div className="card-header">
                                                    <strong>{p.name}</strong>
                                                </div>
                                                <div>
                                                    <p><strong>Price:</strong> ${p.price}</p>
                                                    <p><strong>Quantity:</strong> {p.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default Orders;