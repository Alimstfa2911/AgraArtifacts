import React from 'react';
import {NavLink,Link} from 'react-router-dom';
import { useAuth } from '../../context/auth';

const AdminMenu = () => {
    const [auth,setAuth] = useAuth();

  return (
    <>
        {/* <div className="text-center">
            <h3>Admin Menu</h3>
            <div class="list-group" >
            
                <NavLink to="/dashboard/admin" 
                    className="list-group-item list-group-item-action"> 
                    Admin Dashboard
                </NavLink>
                
                <NavLink to="/dashboard/admin/create-category" 
                    className="list-group-item list-group-item-action"> 
                    Create Category
                </NavLink>
                <NavLink to="/dashboard/admin/create-product" 
                    className="list-group-item list-group-item-action">
                        Create Product
                </NavLink>
                <NavLink to="/dashboard/admin/products" 
                    className="list-group-item list-group-item-action">
                        Products
                </NavLink>
                <NavLink to="/dashboard/admin/orders" 
                    className="list-group-item list-group-item-action">
                        Orders
                </NavLink>
                <NavLink to="/dashboard/admin/users" 
                    className="list-group-item list-group-item-action">
                    Users
                </NavLink>
                <NavLink to="/dashboard/profile" 
                    className="list-group-item list-group-item-action">
                    Update Profile
                </NavLink>
                
            </div>
        </div> */}

        <div className="card mb-3">
                                        
            <div className="card-body text-start">
                <h5>Profile</h5>
                <p><strong>Name:</strong> {auth?.user?.name}</p>
                <p><strong>Email:</strong> {auth?.user?.email}</p>
                <p><strong>Phone :</strong> {auth?.user?.phone}</p>
                <p><strong>Address:</strong> {auth?.user?.address}</p>
                <hr />
                                            
                <Link to="/dashboard/admin/create-category" style={{ textDecoration: 'none', color: 'blue' }}>
                                                <p>Click here to create new category.</p>
                </Link>
                <hr />
                                            
                <Link to="/dashboard/admin/create-product" style={{ textDecoration: 'none', color: 'blue' }}>
                                                <p>Create Product</p>
                </Link>
                <hr />
                                            
                <Link to="/dashboard/admin/products" style={{ textDecoration: 'none', color: 'blue' }}>
                                                <p>Products</p>
                </Link>
                <hr />
                                            
                <Link to="/dashboard/admin/orders" style={{ textDecoration: 'none', color: 'blue' }}>
                                                <p>Orders</p>
                </Link>
                <hr />
                                            
                <Link to="/dashboard/admin/users" style={{ textDecoration: 'none', color: 'blue' }}>
                                                <p>Users</p>
                </Link>
                
            </div>
        </div>
    </>
  )
};

export default AdminMenu;
