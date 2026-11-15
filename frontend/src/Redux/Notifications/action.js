import api from "../../config/api";
import {
    FETCH_NOTIFICATIONS_FAILURE,
    FETCH_NOTIFICATIONS_REQUEST,
    FETCH_NOTIFICATIONS_SUCCESS,
    MARK_NOTIFICATION_AS_READ_FAILURE,
    MARK_NOTIFICATION_AS_READ_REQUEST,
    MARK_NOTIFICATION_AS_READ_SUCCESS
} from "./actionTypes";

const API_BASE_URL = '/api/notifications';

export const fetchNotificationsByUser = (param) => async (dispatch) => {
    dispatch({ type: FETCH_NOTIFICATIONS_REQUEST });
    try {
        const userId = typeof param === 'object' && param !== null ? (param.userId || param.id) : param;
        const token = (typeof param === 'object' && param !== null ? param.jwt : null) || localStorage.getItem('jwt');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await api.get(`${API_BASE_URL}/user/${userId}`, { headers });
        dispatch({ type: FETCH_NOTIFICATIONS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_NOTIFICATIONS_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

export const fetchUserNotifications = fetchNotificationsByUser;

export const markNotificationAsRead = (notificationId) => async (dispatch) => {
    dispatch({ type: MARK_NOTIFICATION_AS_READ_REQUEST });
    try {
        const token = localStorage.getItem('jwt');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await api.put(`${API_BASE_URL}/${notificationId}/read`, null, { headers });
        dispatch({ type: MARK_NOTIFICATION_AS_READ_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: MARK_NOTIFICATION_AS_READ_FAILURE, payload: error.response?.data?.message || error.message });
    }
};
