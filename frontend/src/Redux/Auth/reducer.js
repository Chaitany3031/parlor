import {
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "./actionTypes";

const initialState = {
    user:null,
    isLoading:false,
    error:null,
    customers:[],
    jwt:null
}


const authReducer = (state = initialState,action) =>{
    switch(action.type){
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            case GET_USER_REQUEST:
          return {...state,isLoading:true,error:null}      
                     
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {...state,isLoading:false,jwt:action.payload?.jwt}      
        
        case GET_USER_SUCCESS:
            return{
                ...state,
                isLoading:false,
                user:action.payload,
                fetchingUser:false
            } 
        // case GET_ALL_CUSTOMERS_SUCCESS:
        //     return{
        //         ...state,
        //         isLoading:false,
        //         customers:action.payload,
        //     }   
        
        case GET_USER_FAILURE:
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:        
            return{
                ...state,
                isLoading:false,
                error:action.payload
                // fetchingUser:false
            }    
        
        case LOGOUT:
            localStorage.removeItem('jwt')
            return{...state,jwt:null,user:null}    
        default:
            return state    
    }
}


export default authReducer