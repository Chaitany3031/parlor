import axios from 'axios';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  let token = null;
  if (window.Clerk && window.Clerk.session) {
    try {
      token = await window.Clerk.session.getToken();
    } catch (err) {
      console.warn('Error fetching Clerk token', err);
    }
  }
  if (!token) {
    token = localStorage.getItem('jwt');
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
