import { data } from "react-router-dom";
import api from "../../config/api";
import {
    CREATE_BOOKING_FAILURE,
    CREATE_BOOKING_REQUEST,
    CREATE_BOOKING_SUCCESS,
    FETCH_BOOKED_SLOTS_FAILURE,
    FETCH_BOOKED_SLOTS_REQUEST,
    FETCH_BOOKED_SLOTS_SUCCESS,
    FETCH_BOOKING_BY_ID_FAILURE,
    FETCH_BOOKING_BY_ID_REQUEST,
    FETCH_BOOKING_BY_ID_SUCCESS,
    FETCH_CUSTOMER_BOOKINGS_FAILURE,
    FETCH_CUSTOMER_BOOKINGS_REQUEST,
    FETCH_CUSTOMER_BOOKINGS_SUCCESS,
    FETCH_SALON_BOOKINGS_FAILURE,
    FETCH_SALON_BOOKINGS_REQUEST,
    FETCH_SALON_BOOKINGS_SUCCESS,
    GET_SALON_REPORT_FAILURE,
    GET_SALON_REPORT_REQUEST,
    GET_SALON_REPORT_SUCCESS,
    UPDATE_BOOKING_STATUS_FAILURE,
    UPDATE_BOOKING_STATUS_REQUEST,
    UPDATE_BOOKING_STATUS_SUCCESS
} from "./actionTypes";

const API_BASE_URL = '/api/bookings';

/**
 * Creates a new booking and triggers online payment if link is returned.
 */
export const createBooking = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_BOOKING_REQUEST });

    try {
        const jwt = reqData?.jwt || localStorage.getItem('jwt');
        const salonId = reqData?.salonId;
        const paymentMethod = reqData?.paymentMethod || 'RAZORPAY';
        const bookingData = reqData?.bookingData || reqData?.bookingRequest || reqData;

        const response = await api.post(
            `${API_BASE_URL}?salonId=${salonId}&paymentMethod=${paymentMethod}`,
            bookingData,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
                params:{
                    salonId,paymentMethod:"RAZORPAY"
                }
            }
        );

        if (response.data && response.data.payment_link_url) {
            console.log(' create booking ',data);
            window.location.href = response.data.payment_link_url;
        }

        dispatch({
            type: CREATE_BOOKING_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: CREATE_BOOKING_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};

/**
 * Fetches all bookings made by the current authenticated customer.
 */
export const fetchCustomerBookings = (jwt) => async (dispatch) => {
    dispatch({ type: FETCH_CUSTOMER_BOOKINGS_REQUEST });

    try {
        const token = (typeof jwt === 'object' && jwt !== null ? jwt.jwt : jwt) || localStorage.getItem('jwt');
        const response = await api.get(`${API_BASE_URL}/customer`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({
            type: FETCH_CUSTOMER_BOOKINGS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FETCH_CUSTOMER_BOOKINGS_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};

/**
 * Fetches all bookings belonging to the authenticated owner's salon.
 */
export const fetchSalonBookings = (jwt) => async (dispatch) => {
    dispatch({ type: FETCH_SALON_BOOKINGS_REQUEST });

    try {
        const token = (typeof jwt === 'object' && jwt !== null ? jwt.jwt : jwt) || localStorage.getItem('jwt');
        const response = await api.get(`${API_BASE_URL}/salon`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({
            type: FETCH_SALON_BOOKINGS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FETCH_SALON_BOOKINGS_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};

/**
 * Fetches booking details by booking ID.
 */
export const fetchBookingById = (param) => async (dispatch) => {
    dispatch({ type: FETCH_BOOKING_BY_ID_REQUEST });

    try {
        const bookingId = typeof param === 'object' && param !== null ? param.bookingId : param;
        const token = (typeof param === 'object' && param !== null ? param.jwt : null) || localStorage.getItem('jwt');

        const response = await api.get(`${API_BASE_URL}/${bookingId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({
            type: FETCH_BOOKING_BY_ID_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FETCH_BOOKING_BY_ID_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};

/**
 * Updates booking status (e.g. CONFIRMED, COMPLETED, CANCELLED).
 */
export const updateBookingStatus = ({ bookingId, status, jwt }) => async (dispatch) => {
    dispatch({ type: UPDATE_BOOKING_STATUS_REQUEST });

    try {
        const token = jwt || localStorage.getItem('jwt');
        const response = await api.put(
            `${API_BASE_URL}/${bookingId}/status`,
            null,
            {
                params: { status },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({
            type: UPDATE_BOOKING_STATUS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_BOOKING_STATUS_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};

/**
 * Fetches the salon performance and earnings report for the salon owner.
 */
export const getSalonReport = (jwt) => async (dispatch) => {
    dispatch({ type: GET_SALON_REPORT_REQUEST });

    try {
        const token = (typeof jwt === 'object' && jwt !== null ? jwt.jwt : jwt) || localStorage.getItem('jwt');
        const response = await api.get(`${API_BASE_URL}/report`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({
            type: GET_SALON_REPORT_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_SALON_REPORT_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};

/**
 * Fetches booked slots for a specific salon and date.
 */
export const fetchBookedSlots = ({ salonId, date, jwt }) => async (dispatch) => {
    dispatch({ type: FETCH_BOOKED_SLOTS_REQUEST });

    try {
        const token = jwt || localStorage.getItem('jwt');
        const response = await api.get(`${API_BASE_URL}/slots/salon/${salonId}/date/${date}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({
            type: FETCH_BOOKED_SLOTS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FETCH_BOOKED_SLOTS_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};
