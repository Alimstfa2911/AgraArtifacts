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
      
        <div className="row">
          {/* Sidebar Section (Profile and Orders) */}
          <div className="col-md-3 bg-light p-4 rounded-3 shadow-sm" style={{ backgroundColor: "#f8f9fa" }}>
            <UserMenu/>
          </div>
          

          {/* Main Content (User Data Section) */}
          <div className="col-md-9 bg-white p-4 rounded-3 shadow-sm">
            <div className="card w-100 p-4">
              
              <h4 className="text-primary mb-4">User Details</h4>
              
              <div className="card-body" style={{ backgroundColor: "#f8f9fa" }}>
                <h5 className="text-secondary mb-2"><strong>Name:</strong> {auth?.user?.name}</h5>
                <h5 className="text-secondary mb-2"><strong>Email:</strong> {auth?.user?.email}</h5>
                <h5 className="text-secondary mb-2"><strong>Phone:</strong> {auth?.user?.phone}</h5>
                <h5 className="text-secondary mb-2"><strong>Address:</strong> {auth?.user?.address}</h5>
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
      
    </Layout>
  );
};

export default Dashboard;
