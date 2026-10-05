const initialState = { categories: [], loading: false, error: null };

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_CATEGORIES_SUCCESS':
      return { ...state, categories: action.payload, loading: false };
    default:
      return state;
  }
}
