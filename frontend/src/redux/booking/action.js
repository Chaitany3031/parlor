import { api } from '../../config/api';
import {
  CREATE_BOOKING_REQUEST, CREATE_BOOKING_SUCCESS, CREATE_BOOKING_FAILURE,
  FETCH_USER_BOOKINGS_REQUEST, FETCH_USER_BOOKINGS_SUCCESS, FETCH_USER_BOOKINGS_FAILURE,
  CANCEL_BOOKING_REQUEST, CANCEL_BOOKING_SUCCESS, CANCEL_BOOKING_FAILURE
} from './action.types';

export const createBooking = (bookingData) => async (dispatch) => {
  dispatch({ type: CREATE_BOOKING_REQUEST });
  try {
    const res = await api.post('/api/bookings', bookingData);
    dispatch({ type: CREATE_BOOKING_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_BOOKING_FAILURE, payload: err.message });
  }
};

export const fetchUserBookings = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_USER_BOOKINGS_REQUEST });
  try {
    const res = await api.get(`/api/bookings/user/${userId}`);
    dispatch({ type: FETCH_USER_BOOKINGS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_USER_BOOKINGS_FAILURE, payload: err.message });
  }
};

export const cancelBooking = (bookingId) => async (dispatch) => {
  dispatch({ type: CANCEL_BOOKING_REQUEST });
  try {
    const res = await api.put(`/api/bookings/${bookingId}/cancel`);
    dispatch({ type: CANCEL_BOOKING_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: CANCEL_BOOKING_FAILURE, payload: err.message });
  }
};
