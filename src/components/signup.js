import React, { useState } from 'react';                 
import {useNavigate } from 'react-router-dom';         


const Signup = () => {

  const [Credentials,setCredentials]=useState({name:"",email:"",password:"",confirmpassword:""});
      let navigate=useNavigate();


      const handleSubmit=async(e)=>{
        e.preventDefault();
        const url="http://localhost:5000";
         const response = await fetch(`${url}/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify({name:Credentials.name,email: Credentials.email, password: Credentials.password})
           });
           const data=await response.json();
           console.log(data);

           if(data.success){
            localStorage.setItem('token',data.authtoken);
            navigate("/");
           }
           else{
            alert(data.message);
           }
    }

    const onChange = (e)=>{
        setCredentials({...Credentials, [e.target.name]: e.target.value})
    }

  return (
    <>

<form onSubmit={handleSubmit}>
<div className="row mb-3">
    <label htmlFor="inputname3" className="col-sm-2 col-form-label">Name</label>
    <div className="col-sm-10">
      <input type="name" className="form-control" id="inputname3" onChange={onChange} value={Credentials.name} name='name'/>
    </div>
    </div>
  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input type="email" className="form-control" id="inputEmail3" onChange={onChange} value={Credentials.email} name='email'/>
    </div>
  </div>
  <div className="row mb-3">
    <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input type="password" className="form-control" id="inputPassword3" onChange={onChange} value={Credentials.password} name='password'/>
    </div>
  </div>

  <div className="row mb-3">
    <label for="inputPassword3" className="col-sm-2 col-form-label">Confirm Password</label>
    <div className="col-sm-10">
      <input type="password" className="form-control" id="cinputPassword3" onChange={onChange} value={Credentials.confirmpassword} name='cpassword'/>
    </div>
  </div>
  
  <button type="submit" className="btn btn-primary">Sign in</button>
</form>
    
    </>
  )
}

export default Signup
