import * as actionTypes from './actionTypes.js'
import axios from 'axios'
import {toast } from 'react-toastify';

export const authStart = ()=>{
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (token)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        token:token
    }
}

export const authFail = error =>{
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("expirationDate")
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeout = expirationDate=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout())
        },expirationDate*1000)
    }
}

export const authLogin = (username, password)=>{
    return dispatch =>{
        dispatch(authStart())
        axios.post("http://localhost:8000/api/token/", {
            username:username,
            password:password
        }).then(res=>{
            if (res.data.access===undefined){
                dispatch(authFail())
                toast("Login Failed");
            }else{
                const token=res.data.access
                const expirationDate = new Date(new Date().getTime()+3600*1000)
                localStorage.setItem("token",token)
                localStorage.setItem("expirationDate", expirationDate)
                dispatch(authSuccess(token))
                dispatch(checkAuthTimeout(3600))
                toast("Login Successful");
            }
        }).catch(error=>{
            // notification raise using popper
            dispatch(authFail())
            console.log(error.response)
            if (error.response){
                toast(error.response.data.detail)
            }else{
                console.log(error)
            }
            
        })
    }
}

export const checkExistingSession = ()=>{
    return dispatch=>{
        const token = localStorage.getItem("token")
        if (token){
            dispatch(authStart())
            dispatch(authSuccess(token))
            dispatch(checkAuthTimeout(3600))
        }
    }
}
// export const checkExistingSession = ()=>{
//     return dispatch => {
//         const token = localStorage.getItem("token");
//         if (token === undefined) {
//           dispatch(logout());
//         } else {
//           const expirationDate = new Date(localStorage.getItem("expirationDate"));
//           if (expirationDate <= new Date()) {
//             dispatch(logout());
//           } else {
//             dispatch(authSuccess(token));
//             dispatch(
//               checkAuthTimeout(
//                 (expirationDate.getTime() - new Date().getTime()) / 1000
//               )
//             );
//           }
//         }
//       };
// }
export const authSignup = (username, email, password)=>{
    return dispatch =>{
        dispatch(authStart())
        axios.post("http://localhost:8000/api/register/", {
            username:username,
            email:email,
            password:password
        }).then(res=>{
            if (res.data.token===undefined){
                dispatch(authFail())
                toast("Account Creation Failed");
            }else{
                console.log(res.data.token.access)
                const token=res.data.token.access
                const expirationDate = new Date(new Date().getTime()+3600*1000)
                localStorage.setItem("token",token)
                localStorage.setItem("expirationDate", expirationDate)
                dispatch(authSuccess(token))
                dispatch(checkAuthTimeout(3600))
                toast("Account Creation Successful");
            }
        }).catch(error=>{
            dispatch(authFail())
            console.log(error.response)
            if (error.response && error.response.data){
                toast(error.response.data.detail)
            }else{
                console.log(error)
            }
        })
    }
}

export const isLoggedin =()=>{
    const token = localStorage.getItem("token")
    if (token) {
        return true
    }else{
        return false
    }
}


