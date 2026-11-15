import {
    CREATE_SERVICE_FAILURE,
    CREATE_SERVICE_REQUEST,
    CREATE_SERVICE_SUCCESS,
    FETCH_SERVICES_BY_SALON_FAILURE,
    FETCH_SERVICES_BY_SALON_REQUEST,
    FETCH_SERVICES_BY_SALON_SUCCESS,
    FETCH_SERVICE_BY_ID_FAILURE,
    FETCH_SERVICE_BY_ID_REQUEST,
    FETCH_SERVICE_BY_ID_SUCCESS,
    UPDATE_SERVICE_FAILURE,
    UPDATE_SERVICE_REQUEST,
    UPDATE_SERVICE_SUCCESS
} from "./actionTypes";

const initialState = {
    services: [],
    service: null,
    loading: false,
    error: null
};

export const serviceOfferingReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SERVICES_BY_SALON_REQUEST:
        case FETCH_SERVICE_BY_ID_REQUEST:
        case CREATE_SERVICE_REQUEST:
        case UPDATE_SERVICE_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_SERVICES_BY_SALON_SUCCESS:
            return {
                ...state,
                loading: false,
                services: Array.isArray(action.payload)
                    ? action.payload
                    : action.payload ? Array.from(action.payload) : []
            };

        case FETCH_SERVICE_BY_ID_SUCCESS:
            return { ...state, loading: false, service: action.payload };

        case CREATE_SERVICE_SUCCESS:
            return {
                ...state,
                loading: false,
                services: [...state.services, action.payload]
            };

        case UPDATE_SERVICE_SUCCESS:
            return {
                ...state,
                loading: false,
                services: state.services.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
                service: action.payload
            };

        case FETCH_SERVICES_BY_SALON_FAILURE:
        case FETCH_SERVICE_BY_ID_FAILURE:
        case CREATE_SERVICE_FAILURE:
        case UPDATE_SERVICE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default serviceOfferingReducer;
