import {
    CREATE_REVIEW_FAILURE,
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAILURE,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    FETCH_REVIEWS_BY_SALON_FAILURE,
    FETCH_REVIEWS_BY_SALON_REQUEST,
    FETCH_REVIEWS_BY_SALON_SUCCESS,
    UPDATE_REVIEW_FAILURE,
    UPDATE_REVIEW_REQUEST,
    UPDATE_REVIEW_SUCCESS
} from "./actionTypes";

const initialState = {
    reviews: [],
    review: null,
    loading: false,
    error: null
};

export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REVIEWS_BY_SALON_REQUEST:
        case CREATE_REVIEW_REQUEST:
        case UPDATE_REVIEW_REQUEST:
        case DELETE_REVIEW_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_REVIEWS_BY_SALON_SUCCESS:
            return { ...state, loading: false, reviews: action.payload };

        case CREATE_REVIEW_SUCCESS:
            return { ...state, loading: false, reviews: [action.payload, ...state.reviews] };

        case UPDATE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: state.reviews.map((r) => r.id === action.payload.id ? action.payload : r)
            };

        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: state.reviews.filter((r) => r.id !== action.payload)
            };

        case FETCH_REVIEWS_BY_SALON_FAILURE:
        case CREATE_REVIEW_FAILURE:
        case UPDATE_REVIEW_FAILURE:
        case DELETE_REVIEW_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default reviewReducer;
