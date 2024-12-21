import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={"About us - Ecommerce app"}>
      <div className="row about">
        {/* Left side: Image */}
        <div className="col-md-6">
          <img 
            src="/images/about.jpeg" 
            alt="contactus" 
            style={{width:"100%", height: "100%", objectFit: "cover"}}
          />
        </div>
        
        {/* Right side: Content */}
        <div className="col-md-6 bg-light d-flex justify-content-center align-items-center py-5">
  <div className="bg-white p-4 rounded shadow-sm" style={{ width: '80%', maxWidth: '800px' }}>
    <p className="text-center mt-5" style={{ fontStyle: 'italic' }}>
      AgraArtifacts is an e-commerce platform that connects businesses with customers seeking unique, high-quality home decor items, including precious and historical artifacts from Agra. For businesses, it offers a streamlined marketplace to showcase and sell their products, reaching a wide audience. For customers, the website provides a user-friendly experience with advanced search, secure payment options, and a wide selection of curated, authentic home decor items. Whether you're a business or a customer, AgraArtifacts ensures a seamless, secure, and efficient shopping experience.
    </p>
  </div>
        </div>


      </div>
    </Layout>
  )
}

export default About;
