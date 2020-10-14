import * as actionTypes from './actionTypes.js'
import axios from 'axios'
import {toast } from 'react-toastify';
import {BASEURL} from '../Constants'

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
        axios.post(`${BASEURL}/api/token/`, {
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
        axios.post(`${BASEURL}/api/register/`, {
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

export const reset_password = (email) => async dispatch => {

    const body = JSON.stringify({ email }); 

    try {
        const res = await axios.post(`${BASEURL}/api/auth/users/reset_password/`, {
            email:email
        });
        console.log(res)
        dispatch({
            type: actionTypes.RESET_PASSWORD_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: actionTypes.RESET_PASSWORD_FAIL
        });
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {

    const body = JSON.stringify({ uid, token, new_password, re_new_password }); 

    try {
        const res = await axios.post(`${BASEURL}/api/auth/users/reset_password_confirm/`, {
            uid:uid,
            token:token,
            new_password:new_password,
            re_new_password:re_new_password,
        });
        console.log(res)
        dispatch({
            type: actionTypes.RESET_PASSWORD_CONFIRM_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: actionTypes.RESET_PASSWORD_CONFIRM_FAIL
        });
    }
};


