import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { Row, Col } from 'antd';

const Users = () => {
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="row" >
          {/* Left Section - Admin Menu */}
          <div className="col-md-3 bg-light p-4 rounded-3 shadow-sm">
            <AdminMenu />
          </div>

          {/* Right Section - Users Content */}
          <div className="col-md-9 bg-white p-4">
            <h1>All Users</h1>
            <hr />

            
          </div>
          
      
      </div>
    </Layout>
  );
};

export default Users;
