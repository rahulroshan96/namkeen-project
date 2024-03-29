import * as actionTypes from '../actions/actionTypes'

const updateObject =(oldObject, newObject)=>{
    return {
        ...oldObject,
        ...newObject
    }
}

const initialState = {
    token:null,
    error:null,
    loading:false
}

const authStart = (state, action)=>{
    return updateObject(state, {
        error:null,
        loading:true
    })
}

const authSuccess = (state, action)=>{
    return updateObject(state, {
        error:null,
        loading:false,
        token:action.token
    })
}

const authFail = (state, action)=>{
    return updateObject(state,{
        error:action.error,
        loading:false
    });
}

const authLogout = (state, action)=>{
    return updateObject(state, {
        token:null
    })
}


const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action) ;
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.RESET_PASSWORD_CONFIRM_FAIL:
        case actionTypes.RESET_PASSWORD_CONFIRM_SUCCESS:
        case actionTypes.RESET_PASSWORD_FAIL:
        case actionTypes.RESET_PASSWORD_SUCCESS:
            return state;
        default:
            return state;
    }    

}
export default reducer;
