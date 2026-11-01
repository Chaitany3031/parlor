import {
    FETCH_NOTIFICATIONS_FAILURE,
    FETCH_NOTIFICATIONS_REQUEST,
    FETCH_NOTIFICATIONS_SUCCESS,
    MARK_NOTIFICATION_AS_READ_FAILURE,
    MARK_NOTIFICATION_AS_READ_REQUEST,
    MARK_NOTIFICATION_AS_READ_SUCCESS
} from "./actionTypes";

const initialState = {
    notifications: [],
    loading: false,
    error: null
};

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NOTIFICATIONS_REQUEST:
        case MARK_NOTIFICATION_AS_READ_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_NOTIFICATIONS_SUCCESS:
            return { ...state, loading: false, notifications: action.payload };

        case MARK_NOTIFICATION_AS_READ_SUCCESS:
            return {
                ...state,
                loading: false,
                notifications: state.notifications.map((n) =>
                    n.id === action.payload.id ? action.payload : n
                )
            };

        case FETCH_NOTIFICATIONS_FAILURE:
        case MARK_NOTIFICATION_AS_READ_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default notificationReducer;
