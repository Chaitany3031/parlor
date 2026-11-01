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

const initialState = {
    categories: [],
    category: null,
    loading: false,
    error: null
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
        case FETCH_CATEGORY_BY_ID_REQUEST:
        case CREATE_CATEGORY_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_CATEGORIES_SUCCESS:
            return { ...state, loading: false, categories: action.payload };

        case FETCH_CATEGORY_BY_ID_SUCCESS:
            return { ...state, loading: false, category: action.payload };

        case CREATE_CATEGORY_SUCCESS:
            return { ...state, loading: false, categories: [...state.categories, action.payload] };

        case FETCH_CATEGORIES_FAILURE:
        case FETCH_CATEGORY_BY_ID_FAILURE:
        case CREATE_CATEGORY_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default categoryReducer;
