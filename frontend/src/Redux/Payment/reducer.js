import {
    PAYMENT_SUCCESS_REQUEST,
    PAYMENT_SUCCESS_SUCCESS,
    PAYMENT_SUCCESS_FAILURE,
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILURE,
} from "./actionTypes";

const initialState = {
    loading: false,
    error: null,
    paymentSuccess: false,
    paymentOrder: null,
};

export const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT_SUCCESS_REQUEST:
        case CREATE_PAYMENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case PAYMENT_SUCCESS_SUCCESS:
            return {
                ...state,
                loading: false,
                paymentSuccess: action.payload,
                error: null,
            };

        case CREATE_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                paymentOrder: action.payload,
                error: null,
            };

        case PAYMENT_SUCCESS_FAILURE:
        case CREATE_PAYMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default paymentReducer;
