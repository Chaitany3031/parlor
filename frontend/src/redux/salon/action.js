import { api } from '../../config/api';
import {
  CREATE_SALON_REQUEST, CREATE_SALON_SUCCESS, CREATE_SALON_FAILURE,
  FETCH_SALONS_REQUEST, FETCH_SALONS_SUCCESS, FETCH_SALONS_FAILURE,
  FETCH_SALON_BY_ID_REQUEST, FETCH_SALON_BY_ID_SUCCESS, FETCH_SALON_BY_ID_FAILURE,
  SEARCH_SALONS_REQUEST, SEARCH_SALONS_SUCCESS, SEARCH_SALONS_FAILURE,
} from './action.types';

export const createSalon = (salonData) => async (dispatch) => {
  dispatch({ type: CREATE_SALON_REQUEST });
  try {
    const res = await api.post('/api/salons', salonData);
    dispatch({ type: CREATE_SALON_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_SALON_FAILURE, payload: err.message });
  }
};

export const fetchSalons = () => async (dispatch) => {
  dispatch({ type: FETCH_SALONS_REQUEST });
  try {
    const res = await api.get('/api/salons');
    dispatch({ type: FETCH_SALONS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_SALONS_FAILURE, payload: err.message });
  }
};

export const fetchSalonById = (salonId) => async (dispatch) => {
  dispatch({ type: FETCH_SALON_BY_ID_REQUEST });
  try {
    const res = await api.get(`/api/salons/${salonId}`);
    dispatch({ type: FETCH_SALON_BY_ID_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_SALON_BY_ID_FAILURE, payload: err.message });
  }
};

export const searchSalons = (city) => async (dispatch) => {
  dispatch({ type: SEARCH_SALONS_REQUEST });
  try {
    const res = await api.get(`/api/salons/search?city=${city}`);
    dispatch({ type: SEARCH_SALONS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: SEARCH_SALONS_FAILURE, payload: err.message });
  }
};
