import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import useCategory from '../Hooks/useCategory';
import Layout  from '../components/Layout/Layout.js';

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className='m-4 p-4 bg-gray' style={{ backgroundColor: '#dee2e6' , borderRadius:'7px' }} >
        <div
                className="card m-3 p-3"
                style={{
                  borderRadius: "5px", // Adds border-radius to the card
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Adds a subtle shadow for better aesthetics
                }}
              >
                <h1 className='text-center'>Select Category</h1>
                <hr />
              {categories?.map((c) => (
                
                  <div className="card m-3 p-3"
                      style={{
                        borderRadius: "5px", // Adds border-radius to the card
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Adds a subtle shadow for better aesthetics
                      }}
                      key={c._id}
                   >
                    
                    <Link to={`/category/${c.slug}`} className="btn " style={{ textDecoration: 'none', color: 'blue' }}>
                          {c.name}
                      </Link>
                  
                  </div>
              ))}
              
        </div>
        
      </div>
    </Layout>
  );
};

export default Categories;
