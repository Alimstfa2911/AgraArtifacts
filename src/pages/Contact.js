import React from 'react';
import Layout from '../components/Layout/Layout';
import { BiLogoWhatsapp, BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={'Contact us'}>
      <div className="row contactus " style={{ display: 'flex', minHeight: '100vh' }}>
          
        {/* Left side: Content with Border */}
            
        <div className="col-md-6 d-flex align-items-center justify-content-center " style={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
                <div className="text-center" style={{ maxWidth: '500px', width: '100%', border: '1px solid #ddd', padding: '20px' }}>
                    <h1 className="bg-dark p-2 text-white">CONTACT US</h1>
                    <p className="text-justify mt-3" style={{ fontStyle: "italic", color: "#333" }}>
                        Any query and info about product, feel free to reach Us. We are available 24/7.
                    </p>
                    <p className="mt-3" style={{ fontStyle: "italic", color: "#333" }}>
                        <a href="mailto:www.mustafaali@help.com" className="text-decoration-none text-dark">
                            <BiMailSend className="me-2" /> Email: www.mustafaali@help.com
                        </a>
                    </p>
                    <p className="mt-3" style={{ fontStyle: "italic", color: "#333" }}>
                        <a href="tel:+0123456789" className="text-decoration-none text-dark">
                            <BiPhoneCall className="me-2" /> Call: +91 7209648596
                        </a>
                    </p>
                    <p className="mt-3" style={{ fontStyle: "italic", color: "#333" }}>
                        <a href="https://wa.me/7209648596" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">
                            <BiLogoWhatsapp className="me-2" /> WhatsApp
                        </a>
                    </p>
                </div>
        </div>
          

        {/* Right side: Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center" style={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
              <div className="text-center" style={{ maxWidth: '500px', width: '100%', border: '1px solid #ddd', padding: '20px' }}>
                  <h1 className="bg-dark p-2 text-white">GET IN TOUCH</h1>
                  <form>
                      <div className="mb-3">
                          <label htmlFor="name" className="form-label">Name :</label>
                          <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email :</label>
                          <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="message" className="form-label">Message :</label>
                          <textarea className="form-control" id="message" rows="4" placeholder="Enter your message"></textarea>
                      </div>
                      <button type="submit" className="btn btn-dark">Submit</button>
                  </form>
              </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
