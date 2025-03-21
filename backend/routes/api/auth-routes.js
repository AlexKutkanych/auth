const router = require('express').Router();
const {
  loginUser,
  signupUser,
  logoutUser,
  googleLogin,
} = require('../../controllers/auth-controller');

router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/signup').post(signupUser);
router.route('/google/login').post(googleLogin);

module.exports = router;
