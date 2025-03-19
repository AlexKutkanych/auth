const BASE_URL = `${process.env.REACT_APP_API_PATH}/api/v1`;
const AUTH_BASE_URL = `${BASE_URL}/auth`;

const AUTH_API_ROUTES = {
  SIGN_UP: `${AUTH_BASE_URL}/signup`,
  LOGIN: `${AUTH_BASE_URL}/login`,
  LOGOUT: `${AUTH_BASE_URL}/logout`,
};

export { AUTH_API_ROUTES };
