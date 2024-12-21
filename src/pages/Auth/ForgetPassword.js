import React,{useState} from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";

const ForgetPassword = () => {
  
    const [email,setEmail]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [answer,setAnswer]=useState("");
   

    const navigate=useNavigate();
    

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const res = await axios.post("/api/v1/auth/forget-password",
                {
                    email,
                    newPassword,
                    answer
                });
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                navigate("/login");
            }else{
                toast.error(res.data.message);
            }
        }catch(error){
            console.log(error);
            toast.error("Something  wrong");
        }
    };
  
    return (

        <Layout title={"Forget Password"}>
        <div className="form-container" style={{ marginTop: 0, paddingTop: 0 }}>
        
            <form onSubmit={handleSubmit}>
                <h4 className='title'>RESET PASSWORD</h4>
                
                <div class="mb-3">
                    
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        class="form-control" 
                        id="exampleInputEmail1" 
                        placeholder='E-mail'
                        required
        
                    />
                    
                </div>
                <div class="mb-3">
                    
                    <input 
                        type="text" 
                        value={answer}
                        onChange={(e)=>setAnswer(e.target.value)}
                        class="form-control" 
                        id="exampleInputEmail1" 
                        placeholder='Favorite Sports'
                        required
        
                    />
                    
                </div>
                <div class="mb-3">
                    
                    <input 
                    type="password"
                    value={newPassword} 
                    onChange={(e)=>setNewPassword(e.target.value)}
                    class="form-control" 
                    id="exampleInputPassword1"
                    placeholder='Password'
                    required
                    />
                </div>
                
                <button type="submit" class="btn btn-primary">
                    Reset
                </button>
            </form>
            </div>
        </Layout>
  );
};

export default ForgetPassword;
