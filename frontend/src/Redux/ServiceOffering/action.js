import api from "../../config/api";
import {
    CREATE_SERVICE_FAILURE,
    CREATE_SERVICE_REQUEST,
    CREATE_SERVICE_SUCCESS,
    FETCH_SERVICES_BY_SALON_FAILURE,
    FETCH_SERVICES_BY_SALON_REQUEST,
    FETCH_SERVICES_BY_SALON_SUCCESS,
    FETCH_SERVICE_BY_ID_FAILURE,
    FETCH_SERVICE_BY_ID_REQUEST,
    FETCH_SERVICE_BY_ID_SUCCESS,
    UPDATE_SERVICE_FAILURE,
    UPDATE_SERVICE_REQUEST,
    UPDATE_SERVICE_SUCCESS
} from "./actionTypes";

const API_BASE_URL = '/api/service-offering';

export const fetchServicesBySalonId = (params) => async (dispatch) => {
    dispatch({ type: FETCH_SERVICES_BY_SALON_REQUEST });
    try {
        const salonId = typeof params === 'object' && params !== null ? params.salonId : params;
        const categoryId = typeof params === 'object' && params !== null ? params.categoryId : null;
        const jwt = typeof params === 'object' && params !== null ? params.jwt : null;

        let url = `${API_BASE_URL}/salon/${salonId}`;
        if (categoryId) {
            url += `?categoryId=${categoryId}`;
        }
        const headers = jwt ? { Authorization: `Bearer ${jwt}` } : {};
        const response = await api.get(url, { headers });
        dispatch({ type: FETCH_SERVICES_BY_SALON_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: FETCH_SERVICES_BY_SALON_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};

export const fetchServiceById = (id) => async (dispatch) => {
    dispatch({ type: FETCH_SERVICE_BY_ID_REQUEST });
    try {
        const response = await api.get(`${API_BASE_URL}/${id}`);
        dispatch({ type: FETCH_SERVICE_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: FETCH_SERVICE_BY_ID_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};

export const createService = ({ serviceData, jwt }) => async (dispatch) => {
    dispatch({ type: CREATE_SERVICE_REQUEST });
    try {
        const token = jwt || localStorage.getItem('jwt');
        const response = await api.post(`${API_BASE_URL}/salon-owner`, serviceData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: CREATE_SERVICE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: CREATE_SERVICE_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};

export const createServiceAction = createService;

export const updateService = ({ id, serviceData, jwt }) => async (dispatch) => {
    dispatch({ type: UPDATE_SERVICE_REQUEST });
    try {
        const token = jwt || localStorage.getItem('jwt');
        const response = await api.post(`${API_BASE_URL}/salon-owner/${id}`, serviceData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: UPDATE_SERVICE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: UPDATE_SERVICE_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};
