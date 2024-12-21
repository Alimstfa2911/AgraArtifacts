import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/login', { email, password });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        // Redirect based on role
        if (res.data.user.role === 1) {
          navigate('/dashboard/admin'); // Admin dashboard
        } else {
          navigate('/'); // Default home page for users
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login - E-commerce App">
      <div className="form-container" style={{ marginTop: 0, paddingTop: 0 }}>
        
        <form onSubmit={handleSubmit} >

          <h4 className="title " >Sign In</h4>
          <div className="form-row">
            <div className="mb-3">
              <input
                type="email"
                className="form-control is-invalid"
                id="validationEmail"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control is-invalid"
                id="validationPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <button className="btn btn-primary mt-3" type="submit">
            Login
          </button>
          <div className="forgot-password mt-3" style={{ textAlign: "center" }}>
            <span
                onClick={() => navigate('/forget-password')}
                className="forgot-password-link"
                style={{ cursor: "pointer" }}
              >
               <u><i>Forgot Password?</i></u>
            </span>
          </div>

        </form>
      </div>
    </Layout>
  );
};

export default Login;
