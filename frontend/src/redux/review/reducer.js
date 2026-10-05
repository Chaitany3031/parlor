const initialState = { reviews: [], loading: false, error: null };

export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_REVIEWS_SUCCESS':
      return { ...state, reviews: action.payload, loading: false };
    case 'CREATE_REVIEW_SUCCESS':
      return { ...state, reviews: [action.payload, ...state.reviews], loading: false };
    default:
      return state;
  }
}
