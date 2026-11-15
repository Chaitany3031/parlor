import api from "../../config/api";
import {
    CREATE_REVIEW_FAILURE,
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAILURE,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    FETCH_REVIEWS_BY_SALON_FAILURE,
    FETCH_REVIEWS_BY_SALON_REQUEST,
    FETCH_REVIEWS_BY_SALON_SUCCESS,
    UPDATE_REVIEW_FAILURE,
    UPDATE_REVIEW_REQUEST,
    UPDATE_REVIEW_SUCCESS
} from "./actionTypes";

const API_BASE_URL = '/api/reviews';

export const createReview = ({ salonId, reviewData, jwt }) => async (dispatch) => {
    dispatch({ type: CREATE_REVIEW_REQUEST });
    try {
        const token = jwt || localStorage.getItem('jwt');
        const response = await api.post(`${API_BASE_URL}/salon/${salonId}`, reviewData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: CREATE_REVIEW_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_REVIEW_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

export const fetchReviewsBySalon = (param) => async (dispatch) => {
    dispatch({ type: FETCH_REVIEWS_BY_SALON_REQUEST });
    try {
        const salonId = typeof param === 'object' && param !== null ? (param.salonId || param.id) : param;
        const token = (typeof param === 'object' && param !== null ? param.jwt : null) || localStorage.getItem('jwt');
        const response = await api.get(`${API_BASE_URL}/salon/${salonId}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        dispatch({ type: FETCH_REVIEWS_BY_SALON_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_REVIEWS_BY_SALON_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

export const fetchReviews = fetchReviewsBySalon;

export const updateReview = ({ reviewId, reviewData, jwt }) => async (dispatch) => {
    dispatch({ type: UPDATE_REVIEW_REQUEST });
    try {
        const token = jwt || localStorage.getItem('jwt');
        const response = await api.put(`${API_BASE_URL}/${reviewId}`, reviewData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: UPDATE_REVIEW_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_REVIEW_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

export const deleteReview = ({ reviewId, jwt }) => async (dispatch) => {
    dispatch({ type: DELETE_REVIEW_REQUEST });
    try {
        const token = jwt || localStorage.getItem('jwt');
        await api.delete(`${API_BASE_URL}/${reviewId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: DELETE_REVIEW_SUCCESS, payload: reviewId });
    } catch (error) {
        dispatch({ type: DELETE_REVIEW_FAILURE, payload: error.response?.data?.message || error.message });
    }
};
