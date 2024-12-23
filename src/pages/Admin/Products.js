import React,{useState,useEffect} from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import {Link} from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';

const Products = () => {
    const [products,setProducts] = useState([]);

    //get all products
    const getAllProducts = async ()=>{
        try{
           const {data} = await axios.get('/api/v1/product/get-product');
            setProducts(data?.products);
           
        }catch(error){
            console.log(error);
            toast.error('Something went wrong');
        }

    };

    //lifecycle method
    useEffect(()=>{
        getAllProducts();
    },[])

  return (
    
    <Layout title={"Dashboard - Products"}>
      <div className="row">
            <div className="col-md-3 bg-light p-4 rounded-3 shadow-sm">
                <AdminMenu />
            </div>

            
            
            <div className="col-md-9 bg-white p-4">
                        <h1 className="text-center">
                            All Products List
                        </h1>
                        <hr />

                        <div className="d-flex flex-column" >
                            
                            {products?.map((p)=>( 
                                
                                <Link 
                                    key={p._id}
                                    to={`/dashboard/admin/product/${p.slug}`}
                                    className="product-link"
                                    >
                                        
                                        <div className="card m-2 p-1 product-card d-flex flex-row"
                                            style={{
                                                    width: '90%',
                                                    backgroundColor: '#f8f9fa', // Background color for individual product card
                                                }} >
                                            <img 
                                                src={`/api/v1/product/product-photo/${p._id}`} 
                                                className="card-img-top"  style={{width:'20%'}}
                                                alt={p.name} 
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{p.name}</h5>
                                                <p className="card-text">
                                                    {p.description}
                                            
                                                </p>
                                                
                                                <h6>Price : {p.price}</h6>
                                                <div className="mb-3">
                                                    <button className="btn btn-danger">
                                                        Click for Update 
                                                    </button>
                                                </div>
                                            </div>
                                            
                                        </div>
                                </Link>
                    
                                
                            ))}


                        </div>
            </div>
      </div>
    </Layout>
  );
};

export default Products ;