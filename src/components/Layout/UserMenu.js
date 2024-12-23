import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const UserMenu = () => {
    const [auth] = useAuth();

  return (
    <>
       
            
                
                {/* <NavLink to="/dashboard/user/profile" 
                    className="list-group-item list-group-item-action"> 
                    Profile
                </NavLink>
                <NavLink to="/dashboard/user/orders" 
                    className="list-group-item list-group-item-action">
                        Orders
                </NavLink>
                <NavLink to="/dashboard/user" 
                    className="list-group-item list-group-item-action"> 
                    Dashboard
                </NavLink> */}

        <h4 className='text-center'>User Menu</h4>
        <div className="card mb-3">
            
                                
            <div className="card-body text-start">
                                    <h5>Profile</h5>
                                    <hr />
                                    <p><strong>Name:</strong> {auth?.user?.name}</p>
                                    <p><strong>Email:</strong> {auth?.user?.email}</p>
                                    <p><strong>Address:</strong> {auth?.user?.address}</p>
                                    <Link to="/dashboard/user" style={{ textDecoration: 'none', color: 'blue' }}>
                                        <p>User Dashboard</p>
                                    </Link>
                                    <hr />
                                    <h5>Orders</h5>
                                    <Link to="/dashboard/user/orders" style={{ textDecoration: 'none', color: 'blue' }}>
                                        <p>Your orders will appear here.</p>
                                    </Link>
                                    <hr />
                                    <h5>Update Profile</h5>
                                    <Link to="/dashboard/user/profile" style={{ textDecoration: 'none', color: 'blue' }}>
                                        <p>Update Profile</p>
                                    </Link>
            </div>
        </div>
            
                
        
        
    </>
  )
};

export default UserMenu;
