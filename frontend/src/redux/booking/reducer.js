import {
  CREATE_BOOKING_REQUEST, CREATE_BOOKING_SUCCESS, CREATE_BOOKING_FAILURE,
  FETCH_USER_BOOKINGS_REQUEST, FETCH_USER_BOOKINGS_SUCCESS, FETCH_USER_BOOKINGS_FAILURE,
  CANCEL_BOOKING_REQUEST, CANCEL_BOOKING_SUCCESS, CANCEL_BOOKING_FAILURE
} from './action.types';

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_BOOKING_REQUEST:
    case FETCH_USER_BOOKINGS_REQUEST:
    case CANCEL_BOOKING_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_BOOKING_SUCCESS:
      return { ...state, loading: false, bookings: [action.payload, ...state.bookings] };
    case FETCH_USER_BOOKINGS_SUCCESS:
      return { ...state, loading: false, bookings: action.payload };
    case CANCEL_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: state.bookings.map((b) => (b.id === action.payload.id ? action.payload : b)),
      };
    case CREATE_BOOKING_FAILURE:
    case FETCH_USER_BOOKINGS_FAILURE:
    case CANCEL_BOOKING_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
