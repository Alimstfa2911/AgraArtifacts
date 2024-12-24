import React from 'react';
import { Link } from 'react-router-dom';
import { BiLogoWhatsapp, BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";


const Footer = () => {
  return (
    <div className='footer bg-dark test-light' >
      
      <p className='text-center mt-3' >
        <Link to="/about">About</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/policy">Privacy Policy</Link>
      </p>
      <div className="contact-info text-center mt-3">
        <p>
          <span style={{ fontStyle: 'italic' }}>
            <a href="mailto:mca23.mustafaali@bvicam.in">Email : <BiMailSend className="me-2" /></a> | 
            <a href="tel:+91 7209648596"> Phone: <BiPhoneCall className="me-2" /></a> | 
            <a href="https://wa.me/7209648596" target="_blank" rel="noopener noreferrer"> WhatsApp: <BiLogoWhatsapp className="me-2" /></a>
          </span>
        </p>
      </div>
      <h3 className='text-center'>
        <i>Copyright</i> &copy; Md_Mustafa_Ali
      </h3>
      
    </div>
  );
};

export default Footer;
