import { AUTH_API_ROUTES } from './constants';
import apiClient from './apiClient';

export const createUser = async (body) => {
  const response = await apiClient.post(AUTH_API_ROUTES.SIGN_UP, body);
  return response.data;
};

export const loginUser = async (body) => {
  const response = await apiClient.post(AUTH_API_ROUTES.LOGIN, body);
  return response.data;
};

export const logoutUser = async (body) => {
  const response = await apiClient.get(AUTH_API_ROUTES.LOGOUT, body);
  return response.data;
};
