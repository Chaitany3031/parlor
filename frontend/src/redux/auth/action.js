import { api, API_BASE_URL } from '../../config/api';
import axios from 'axios';
import {
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE,
  LOGOUT
} from './action.types';

export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    if (res.data.jwt) {
      localStorage.setItem('jwt', res.data.jwt);
    }
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const loginUser = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    if (res.data.jwt) {
      localStorage.setItem('jwt', res.data.jwt);
    }
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const getUserProfile = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const res = await api.get('/api/users/profile');
    dispatch({ type: GET_USER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwt');
  dispatch({ type: LOGOUT });
};
