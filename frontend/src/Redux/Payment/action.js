import api from "../../config/api";
import {
    PAYMENT_SUCCESS_REQUEST,
    PAYMENT_SUCCESS_SUCCESS,
    PAYMENT_SUCCESS_FAILURE,
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILURE,
} from "./actionTypes";

export const paymentSuccessAction = ({ paymentId, paymentLinkId, jwt }) => async (dispatch) => {
    dispatch({ type: PAYMENT_SUCCESS_REQUEST });
    try {
        const token = jwt || localStorage.getItem("jwt");
        const response = await api.patch(
            `/api/payments/proceed`,
            null,
            {
                params: {
                    paymentId,
                    paymentLinkId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({
            type: PAYMENT_SUCCESS_SUCCESS,
            payload: response.data,
        });
        return response.data;
    } catch (error) {
        dispatch({
            type: PAYMENT_SUCCESS_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
        throw error;
    }
};

export const createPaymentLink = ({ bookingData, paymentMethod = "RAZORPAY", jwt }) => async (dispatch) => {
    dispatch({ type: CREATE_PAYMENT_REQUEST });
    try {
        const token = jwt || localStorage.getItem("jwt");
        const response = await api.post(
            `/api/payments/create`,
            bookingData,
            {
                params: {
                    paymentMethod,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.data && response.data.payment_link_url) {
            window.location.href = response.data.payment_link_url;
        }

        dispatch({
            type: CREATE_PAYMENT_SUCCESS,
            payload: response.data,
        });
        return response.data;
    } catch (error) {
        dispatch({
            type: CREATE_PAYMENT_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
        throw error;
    }
};

// Also export as PaymentSuccessAction for compatibility
export const PaymentSuccessAction = paymentSuccessAction;
