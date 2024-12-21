import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from "../../context/auth";
import './../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={'Admin Dashboard'}>
        <div className="row">
          {/* Left Side - Admin Menu */}
          <div className="col-md-3 bg-light p-4 rounded-3 shadow-sm">
            <AdminMenu />
          </div>

          {/* Right Side - Admin Info */}
          <div className="col-md-9 bg-white p-4 rounded-3 shadow-sm">
            <div className="card w-100 p-4">
              <h3 className="text-primary mb-4">Admin Dashboard</h3>
              <div className="user-info">
                <h5 className="text-secondary mb-2"><strong>Name:</strong> {auth?.user?.name}</h5>
                <h5 className="text-secondary mb-2"><strong>Email:</strong> {auth?.user?.email}</h5>
                <h5 className="text-secondary mb-2"><strong>Phone:</strong> {auth?.user?.phone}</h5>
              </div>
            </div>
          </div>
        </div>
      
    </Layout>
  );
};

export default AdminDashboard;
