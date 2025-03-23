const router = require('express').Router();
const {
  loginUser,
  signupUser,
  logoutUser,
  googleLogin,
  checkUser,
  verifyOtp,
} = require('../../controllers/auth-controller');

router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/signup').post(signupUser);
router.route('/google/login').post(googleLogin);
router.route('/mfa/user').post(checkUser);
router.route('/mfa/verify-otp').post(verifyOtp);

module.exports = router;
