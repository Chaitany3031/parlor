const initialState = { services: [], loading: false, error: null };

export default function serviceOfferingReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_SERVICES_BY_SALON_SUCCESS':
      return { ...state, services: action.payload, loading: false };
    default:
      return state;
  }
}
