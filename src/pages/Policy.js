import React from 'react';
import Layout from '../components/Layout/Layout';

const Policy = () => {
  return (
    <Layout title={'Privacy Policy'}>
      {/* Banner Image Section */}
      <div className="row policy">
        <img 
          src="/images/banner.jpeg" 
          alt="policy" 
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      {/* Privacy Policy Content Section */}
      <div className="my-5" style={{ padding: '0 15px' }}>
        <div className="row">
          <div className="col-12">
            <div 
              style={{
                border: '1px solid #ddd', 
                padding: '30px', 
                borderRadius: '10px', 
                backgroundColor: '#f9f9f9',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              {/* Page Title */}
              <h2 className="mb-4" style={{ fontWeight: 'bold', color: '#003366' }}>Privacy Policy</h2>
              <p className="text-justify" style={{ fontStyle: 'italic', color: '#333', fontSize: '16px' }}>
                Welcome to our Privacy Policy. We value your privacy and want to ensure you have a safe experience on our platform. Below are the details on how we collect, use, and protect your personal data.
              </p>

              {/* Policy Sections */}
              <div style={{ textAlign: 'left', fontSize: '16px', color: '#333' }}>
                
                <h4 className="mt-4" style={{ color: '#003366', fontWeight: 'bold' }}>1. Information We Collect</h4>
                <p>
                  We collect personal information when you register, place an order, or interact with our services. This may include your name, email address, phone number, and payment information. 
                </p>

                <h4 className="mt-4" style={{ color: '#003366', fontWeight: 'bold' }}>2. How We Use Your Information</h4>
                <p>
                  The information we collect is used to process your transactions, manage your account, provide customer support, and improve our services. We may also use your information for marketing and promotional purposes.
                </p>

                <h4 className="mt-4" style={{ color: '#003366', fontWeight: 'bold' }}>3. Data Protection</h4>
                <p>
                  We are committed to ensuring that your information is secure. We implement appropriate physical, electronic, and managerial procedures to safeguard and secure the information we collect online.
                </p>

                <h4 className="mt-4" style={{ color: '#003366', fontWeight: 'bold' }}>4. Cookies</h4>
                <p>
                  Our website uses cookies to enhance your experience and to track website usage. Cookies are small files stored on your device. You can set your browser to block or alert you about these cookies, but this may affect certain features of the site.
                </p>

                <h4 className="mt-4" style={{ color: '#003366', fontWeight: 'bold' }}>5. Your Rights</h4>
                <p>
                  You have the right to request access to your personal information, correct any inaccuracies, or request deletion of your data. Please contact us if you would like to exercise these rights.
                </p>

                <h4 className="mt-4" style={{ color: '#003366', fontWeight: 'bold' }}>6. Sharing Your Information</h4>
                <p>
                  We do not sell or trade your personal data to third parties. However, we may share information with trusted third-party service providers to fulfill your orders and provide services on our behalf.
                </p>

                <h4 className="mt-4" style={{ color: '#003366', fontWeight: 'bold' }}>7. Policy Changes</h4>
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the "Last Updated" date will be revised accordingly.
                </p>

                <h4 className="mt-4" style={{ color: '#003366', fontWeight: 'bold' }}>8. Contact Us</h4>
                <p>
                  If you have any questions regarding this Privacy Policy, feel free to contact us at <a href="mailto:help@ecommerceapp.com">help@ecommerceapp.com</a>.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Policy;
