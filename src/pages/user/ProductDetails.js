import React,{useState,useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../../context/cart';
import { useNavigate } from 'react-router-dom';


const ProductDetails = () => {
  
  const navigate = useNavigate();
  const params = useParams();
  const [product,setProduct] = useState({});
  const [relatedProducts,setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();


  

  //getProduct
  const getProduct = async () =>{
    try{
      const {data} = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id,data?.product.category._id);
    }catch(error){
      console.log(error);
    }
  };

  useEffect(()=>{
    if(params?.slug){
      getProduct();
    }
  },[params?.slug])

  //get-similar product
  const getSimilarProduct = async (pid,cid) =>{
    try{
      const {data} = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
        );
        setRelatedProducts(data?.products);
    }catch(error){
      console.log(error);

    }
  }
  return (
    <Layout>
      <div className='m-4 p-4 bg-gray' style={{ backgroundColor: '#dee2e6' , borderRadius:'7px' }} >
          <div
              className="card m-3 p-3"
              style={{
                borderRadius: "5px", // Adds border-radius to the card
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Adds a subtle shadow for better aesthetics
              }}
            >
      <div className="d-flex flex-wrap">
        {/* Image Section */}
        <div className="card md-6 m-2 p-2">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            style={{
              width: "100%", // Makes the image fill the width of the card
              height: "350px", // Adjust height to your preference
              objectFit: "cover", // Ensures the image is cropped proportionally
              borderRadius: "5px", // Adds rounded corners to the image
            }}
          />
        </div>

        {/* Details Section */}
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h4>Name: {product.name}</h4>
          <h4>Description: {product.description}</h4>
          <h4>Price: {product.price}</h4>
          <h4>Category: {product?.category?.name}</h4>

          <button
            className="btn btn-outline-success ms-1"
            onClick={() => {
              const singleProduct = {
                _id: 'product_id', // Replace with the actual product ID
                name: 'Product Name', // Replace with the product name
                price: 100, // Replace with the product price
                quantity: 10, // Total available quantity
              };

              const existingProductIndex = cart.findIndex(item => item._id === singleProduct._id);

              if (existingProductIndex !== -1) {
                const updatedCart = [...cart];

                // Check if more items can be added
                if (updatedCart[existingProductIndex].noOfItems < singleProduct.quantity) {
                  updatedCart[existingProductIndex].noOfItems += 1;
                  updatedCart[existingProductIndex].price += singleProduct.price;

                  setCart(updatedCart);
                  localStorage.setItem('cart', JSON.stringify(updatedCart));
                  toast.success('Item added to Cart');
                } else {
                  toast.error('No more items are available');
                }
              } else {
                // Add new product
                const updatedCart = [...cart, { ...singleProduct, noOfItems: 1 }];
                setCart(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                toast.success('Item added to Cart');
              }
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
          </div>

          <hr />
          <div className="row container" style={{ backgroundColor: '#dee2e6' , borderRadius:'7px' }}>
            
            
            {relatedProducts.length<1?(<h2 className='text-center'>No Similar Products Found</h2>):<h2 className='text-center'>Similar Products</h2>}
            <div
  className="d-flex flex-wrap card m-3 p-3"
  style={{
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Adds a subtle shadow for better aesthetics
  }}
>
  <div className="row">
    {relatedProducts?.map((p, index) => (
      <div
        className="col-md-4 mb-4" // Takes up 1/3 of the width for medium+ screens
        key={index}
      >
        <div
          className="card m-2 p-3"
          style={{
            width: "100%",
            backgroundColor: "#f8f9fa",
            borderRadius: "7px",
          }}
        >
          <img
            src={`/api/v1/product/product-photo/${p._id}`}
            className="card-img-top"
            alt={p.name}
            style={{
              height: "200px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
          <div
            className="card-body"
            style={{ backgroundColor: "#dee2e6", borderRadius: "7px" }}
          >
            <h5 className="card-title">{p.name}</h5>
            <p className="card-text">{p.description.substring(0, 30)}...</p>
            <p className="card-text">Price: ${p.price}</p>

            <button
              className="btn btn-outline-primary"
              onClick={() => navigate(`/product/${p.slug}`)}
            >
              More Details
            </button>

            <button
              className="btn btn-outline-success ms-1"
              onClick={() => {
                const existingProductIndex = cart.findIndex(
                  (item) => item._id === p._id
                );

                if (existingProductIndex !== -1) {
                  const updatedCart = [...cart];
                  // Product already exists in the cart: update quantity and price
                  if (
                    updatedCart[existingProductIndex].noOfItems <
                    updatedCart[existingProductIndex].quantity
                  ) {
                    updatedCart[existingProductIndex].noOfItems += 1; // Increment quantity
                    updatedCart[existingProductIndex].price += p.price; // Update total price for that product
                    setCart(updatedCart);
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                    toast.success("Item added to Cart");
                  } else {
                    toast.error("No more items are available");
                  }
                } else {
                  // Product not in cart: add as a new item with noOfItems set to 1
                  const updatedCart = [...cart, { ...p, noOfItems: 1 }];
                  setCart(updatedCart);
                  localStorage.setItem("cart", JSON.stringify(updatedCart));
                  toast.success("Item added to Cart");
                }
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
            </div>

          </div>
      </div>
      
    </Layout>
  );
};

export default ProductDetails; 