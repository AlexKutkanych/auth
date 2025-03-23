const BASE_URL = `${process.env.REACT_APP_API_PATH}/api/v1`;
const AUTH_BASE_URL = `${BASE_URL}/auth`;

const AUTH_API_ROUTES = {
  SIGN_UP: `${AUTH_BASE_URL}/signup`,
  LOGIN: `${AUTH_BASE_URL}/login`,
  LOGIN_WITH_OTP: `${AUTH_BASE_URL}/mfa/user`,
  VERIFY_OTP: `${AUTH_BASE_URL}/mfa/verify-otp`,
  LOGOUT: `${AUTH_BASE_URL}/logout`,
  GOOGLE_LOGIN: `${AUTH_BASE_URL}/google/login`,
};

export { AUTH_API_ROUTES };
