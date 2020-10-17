// frontend/src/components/api/authenticationApi.js
import axiosAPI, { setNewHeaders } from "./axiosApi";

export async function signUp(email, username, password) {
  const response = await axiosAPI.post("register/", {
    username,
    password,
  });
  localStorage.setItem("user", response.data);
  return response;
}

export async function obtainToken(username, password) {
  const response = await axiosAPI.post("token/", {
    username,
    password,
  });
  console.log(response)
  setNewHeaders(response);

  return response;
}

export async function refreshToken(refresh) {
  const response = await axiosAPI.post("token/refresh/", {
    refresh,
  });
  setNewHeaders(response);
  return response;
}

// eslint-disable-next-line
export async function logout() {
  try{
    localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  // TODO: invalidate token on backend
  }catch(e){
    console.log("Error while loggint out")
    console.log(e)
  }
  
}


// verify this token
export const isAuthenticated = () => {
  // const token = localStorage.getItem("access_token");
  // console.log("Found Token already authenticated")
  // return !!token;
  if ("token" in localStorage){
    return true
  }else{
    return false
  }
};

export async function testAPI() {
  
    const response = await axiosAPI.get("/", {
    });
    return response;
  }

  export async function getProducts(username, password) {
    const token = localStorage.getItem("access_token");
    const response = await axiosAPI.post("products-list/", {
      token:token
    });
    
    console.log(response)
    setNewHeaders(response);
    return response;
  }


  export async function updateCartFromLocalStorageAPI(itemsList){
    const token = localStorage.getItem("access_token");
     const response = await axiosAPI.post("cart-create/", {
       "cart_items":itemsList
     });
     console.log(response)
     return response
  }
  