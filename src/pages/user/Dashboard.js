import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [auth] = useAuth();

  // Map Configuration
  const mapStyles = {
    height: "400px",
    width: "100%",
    borderRadius: "10px",
    marginTop: "20px",
  };

  const defaultCenter = {
    lat: 28.6139, // Example Latitude (Delhi)
    lng: 77.2090, // Example Longitude (Delhi)
  };

  return (
    <Layout title={'Dashboard - Ecommerce App'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          {/* Sidebar Section (Profile and Orders) */}
          <div className="col-md-3" style={{ backgroundColor: "#f8f9fa" }}>
            <div className="card mb-3">
              <div className="card-header text-center">
                <h4>Dashboard</h4>
              </div>
              <div className="card-body">
                <h5>Profile</h5>
                <p><strong>Name:</strong> {auth?.user?.name}</p>
                <p><strong>Email:</strong> {auth?.user?.email}</p>
                <p><strong>Address:</strong> {auth?.user?.address}</p>
                <hr />
                <h5>Orders</h5>
                <Link to="/orders" style={{ textDecoration: 'none', color: 'blue' }}>
    <p>Your orders will appear here.</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content (User Data Section) */}
          <div className="col-md-9">
            <div className="card mb-3">
              <div className="card-header text-center">
                <h4>User Details</h4>
              </div>
              <div className="card-body" style={{ backgroundColor: "#f8f9fa" }}>
                <div className="row mb-3">
                  <div className="col-4">
                    <strong>Name:</strong>
                  </div>
                  <div className="col-8">
                    <span>{auth?.user?.name}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <strong>Email:</strong>
                  </div>
                  <div className="col-8">
                    <span>{auth?.user?.email}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <strong>Phone no. :</strong>
                  </div>
                  <div className="col-8">
                    <span>{auth?.user?.phone}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <strong>Address:</strong>
                  </div>
                  <div className="col-8">
                    <span>{auth?.user?.address}</span>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <LoadScript googleMapsApiKey="GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={mapStyles}
                  zoom={13}
                  center={defaultCenter}
                />
              </LoadScript>
              {/* End Google Map */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
