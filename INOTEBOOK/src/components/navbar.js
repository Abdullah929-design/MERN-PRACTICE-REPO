import React,{useEffect} from 'react'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router'

const Navbar=()=>{
  let location = useLocation();

  useEffect(() => {
  console.log(location.pathname);  
  }, [location]);


  return (
    <>
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">inotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"? "active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/About"? "active":""}`} to="/about">About</Link>
        </li>
        
      </ul>

      {!localStorage.getItem('token') ? (
  <form className="d-flex" role="search">
    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
    <button className="btn btn-outline-success mx-2" type="submit">Search</button> 
    <Link className="btn btn-outline-primary mx-2" to="/login">Login</Link>
    <Link className="btn btn-outline-secondary mx-2" to="/signup">SignUp</Link>
  </form>
) : (
  <button
    className="btn btn-outline-danger mx-2"
    onClick={() => {
      localStorage.removeItem('token'); 
    }}
  >
    Logout
  </button>
)}

    
       </div>
  </div>
</nav>
      
    </div>
    </>
  )
}
export default Navbar;