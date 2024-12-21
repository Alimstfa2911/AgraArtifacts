import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from '../Forms/SearchInput.js';
import useCategory from '../../Hooks/useCategory.js';
import { useCart } from '../../context/cart.js';
import { Badge } from 'antd';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart, setCart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    setCart([]); // Clear cart context
    localStorage.removeItem("auth");
    localStorage.removeItem("cart"); // Clear cart data from local storage
    toast.success("Logout Successfully");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={{ backgroundColor: '#2c3e50', padding: '8px 0' }}>
      <div className="container-fluid">
        <button
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarTogglerDemo01" 
          aria-controls="navbarTogglerDemo01" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand text-white" style={{ fontWeight: 'bold' }}>
            🛒 AgraArtifacts
          </Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <SearchInput />
            <li className="nav-item">
              <NavLink to="/" className="nav-link text-white" style={{ textDecoration: 'none', padding: '10px 15px' }}>
                Home
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-white" 
                to={"/categories"}
                data-bs-toggle="dropdown"
                style={{ textDecoration: 'none', padding: '10px 15px' }}
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={'/categories'}>
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li key={c._id}>
                    <Link className="dropdown-item" to={'/'}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link text-white" style={{ textDecoration: 'none', padding: '10px 15px' }}>
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link text-white" style={{ textDecoration: 'none', padding: '10px 15px' }}>
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <NavLink 
                    className="nav-link dropdown-toggle text-white"  
                    href="#"
                    role="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    style={{ textDecoration: 'none', padding: '10px 15px' }}
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li> 
                      <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} 
                        className="dropdown-item" 
                        style={{ padding: '10px 15px' }}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink onClick={handleLogout} to="/login" className="dropdown-item" style={{ padding: '10px 15px' }}>
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}

            {auth?.user?.role !== 1 && (
              <li className="nav-item m-2">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link text-white" style={{ textDecoration: 'none', padding: '10px 15px' }}>
                    Cart
                  </NavLink>
                </Badge>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
