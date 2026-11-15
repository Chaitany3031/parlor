import api from "../../config/api";
import {
    CREATE_CATEGORY_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORY_BY_ID_FAILURE,
    FETCH_CATEGORY_BY_ID_REQUEST,
    FETCH_CATEGORY_BY_ID_SUCCESS
} from "./actionTypes";

const API_BASE_URL = '/api/categories';

export const fetchCategoriesBySalon = (salonId) => async (dispatch) => {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    try {
        const id = typeof salonId === 'object' && salonId !== null ? (salonId.salonId || salonId.id) : salonId;
        const response = await api.get(`${API_BASE_URL}/salon/${id}`);
        dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

export const getCategoriesBySalon = fetchCategoriesBySalon;

export const fetchCategoryById = (id) => async (dispatch) => {
    dispatch({ type: FETCH_CATEGORY_BY_ID_REQUEST });
    try {
        const response = await api.get(`${API_BASE_URL}/${id}`);
        dispatch({ type: FETCH_CATEGORY_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_CATEGORY_BY_ID_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

export const createCategory = ({ categoryData, jwt }) => async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
        const token = jwt || localStorage.getItem('jwt');
        const response = await api.post(API_BASE_URL, categoryData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error.response?.data?.message || error.message });
    }
};
