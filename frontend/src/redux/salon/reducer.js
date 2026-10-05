import {
  CREATE_SALON_REQUEST, CREATE_SALON_SUCCESS, CREATE_SALON_FAILURE,
  FETCH_SALONS_REQUEST, FETCH_SALONS_SUCCESS, FETCH_SALONS_FAILURE,
  FETCH_SALON_BY_ID_REQUEST, FETCH_SALON_BY_ID_SUCCESS, FETCH_SALON_BY_ID_FAILURE,
  SEARCH_SALONS_REQUEST, SEARCH_SALONS_SUCCESS, SEARCH_SALONS_FAILURE,
} from './action.types';

const initialState = {
  salons: [],
  selectedSalon: null,
  loading: false,
  error: null,
};

export default function salonReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_SALON_REQUEST:
    case FETCH_SALONS_REQUEST:
    case FETCH_SALON_BY_ID_REQUEST:
    case SEARCH_SALONS_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_SALON_SUCCESS:
      return { ...state, loading: false, salons: [...state.salons, action.payload] };
    case FETCH_SALONS_SUCCESS:
    case SEARCH_SALONS_SUCCESS:
      return { ...state, loading: false, salons: action.payload };
    case FETCH_SALON_BY_ID_SUCCESS:
      return { ...state, loading: false, selectedSalon: action.payload };
    case CREATE_SALON_FAILURE:
    case FETCH_SALONS_FAILURE:
    case FETCH_SALON_BY_ID_FAILURE:
    case SEARCH_SALONS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
