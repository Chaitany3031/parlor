import axios from "axios";
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./actionTypes"

export const registerUser = (userData) => async (dispatch) => {
    dispatch({type:REGISTER_REQUEST})
    console.log('auth action - ',userData);
    try {
        const response = await axios.post(
            `${API_BASE_URL}/auth/signup`,
            userData.userData
        )
        const user = response.data
        if(user?.jwt){
            localStorage.setItem('jwt',user.jwt)
            userData.navigate('/')
        }
        console.log('register :- ',user);
        dispatch({type:REGISTER_SUCCESS,payload:user})    
    } catch (error) {
        console.log('error ',error);
        dispatch({type:REGISTER_FAILURE,payload:error})
    }
    
}


//Login action creators

// const loginRequest = () => ({type:LOGIN_REQUEST})
// const loginSuccess = (user) => ({type:LOGIN_SUCCESS,payload:user})


export const loginUser = (userData) => async (dispatch) =>{
    dispatch({type:LOGIN_REQUEST})
    try {
        const response = await axios.post(
            `${API_BASE_URL}/auth/login`,
            userData.data
        )
        const user = response.data
        if(user?.jwt){
            localStorage.setItem("jwt",user.jwt)
            if(user?.role === 'ROLE_ADMIN'){
                userData.navigate('/admin')//01:02:32
            }else if(user?.role === 'ROLE_SALON_OWNER'){
                userData.navigate('/salon-dashboard')
            }else{
                userData.navigate('/')
            }
        }
        console.log('login ',user);
        dispatch({type:LOGIN_SUCCESS,payload:user})
        
    } catch (error) {
        console.log('error ',error);
        dispatch({type:LOGIN_FAILURE,payload:error})
        
    }
}



// get user from token

export const getAllCustomers = (token) =>{
    return async (dispatch) =>{
        console.log('jwt - ',token);
        dispatch({type:GET_ALL_CUSTOMERS_REQUEST})
        try {
            const response = await axios.get(`${API_BASE_URL}/api/admin/users`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const users = response.data
            dispatch({
                type:GET_ALL_CUSTOMERS_SUCCESS,payload:users
            })
            console.log("All customers ",users);
            
        } catch (error) {
            const errorMessage = error.message
            console.log(error);
            dispatch({type:GET_ALL_CUSTOMERS_FAILURE,payload:errorMessage})
        }
    }
}


//1:04:1

export const getUser = (token) =>{
    return async(dispatch)=>{
        dispatch({
            type:GET_USER_REQUEST
        })
        try {
            const response = await api.get(`/api/users/profile`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const user = response.data
            dispatch({type:GET_USER_SUCCESS,payload:user})
            console.log('req user : ',user);
            
        } catch (error) {
            const errorMessage = error.message
            dispatch({type:GET_USER_FAILURE,payload:errorMessage})
        }
    }
}


export const logout = () => {
    return async (dispatch) =>{
        dispatch({
            type:LOGOUT
        })
        localStorage.clear()
    }
}