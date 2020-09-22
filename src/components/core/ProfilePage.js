// frontend/src/components/core/ProfilePage.js
import React, {useState, useEffect} from "react";
import axiosAPI from "../api/axiosApi";
import {logout, isAuthenticated, getProducts} from '../api/authenticationApi.js'
import {Link} from "react-router-dom";
import { loginUser } from "../../redux/actions/auth";

var axios = require('axios');

var config = {
    method: 'get',
    url: 'http://localhost:8000/api/products-list/',
    headers: { 
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',
    }
  };


const ProfilePage = ({history}) => {
  const [data, setData] = useState({});
  const handleClick = async () => {
    const response = await axiosAPI.get("cart-get/");
    alert(JSON.stringify(response.data));
  };

  const logoutUser = async ()=>{
    console.log(isAuthenticated())
    // await logout()
    // history.pushState("/")
  }

  return (
    <div>
      <h1>Profile page</h1>
      <h2>You are Logged In</h2>
      <p>Only logged in users should see this</p>
      <button onClick={handleClick}>GET protected</button>
      <Link to="/"><button onClick={logout} type="submit">Logout</button></Link>
      <button onClick={getProducts}>Get Products</button>
      {JSON.stringify(data)}
      <button onClick={logoutUser}>Test</button>
    </div>
  );
};



export default ProfilePage;


/**
 * 
 * 1. Write APIs
 * 2. Login Page + SignUp Page + Forget Password + Logout User
 * 3. Cart Page
 * 4. Banner
 * 5. Navbar
 * 6. Footer
 * 7. Address Page
 * 8. Payment Page
 * 9. About Us Page
 * 10.Contact Us Page
 * 11.Email Verification
 * 12. All Auth
 * 13. Checkout As Guests
 * 14. API Security
 */