import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import "../../styles/AuthStyles.css";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Profile = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // State for profile form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // Get User Data from context
    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    }, [auth?.user]);

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                "/api/v1/auth/profile", {
                    name,
                    email,
                    password,
                    phone,
                    address
                });
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success("Profile Updated successfully");

                // Redirect to the appropriate page
                const redirectTo = location?.state?.from || '/dashboard/user';
                navigate(redirectTo);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={'Your Profile'}>
                <div className="row"> {/* Flexbox layout */}
                    {/* Left Sidebar */}
                    <div className="col-md-3 bg-light p-4 rounded-3 shadow-sm" style={{ backgroundColor: "#f8f9fa" }}>
                        <UserMenu/>
                    </div>

                    {/* Right Content Area (Form) */}
                    <div className='col-md-9 bg-white p-4 rounded-3 shadow-sm' >
                        <div className='col-md-3 w-100 p-4'>
                            <form onSubmit={handleSubmit}>
                                <h4 className='title'>Update Profile</h4>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                        placeholder='Enter your Name'
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        placeholder='E-mail'
                                        disabled
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        placeholder='Password'
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="form-control"
                                        placeholder='Phone'
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="form-control"
                                        placeholder='Address'
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            </form>
                        </div>
                    
                            
                        
                    </div>
                    
                </div>
            
        </Layout>
    );
};

export default Profile;
