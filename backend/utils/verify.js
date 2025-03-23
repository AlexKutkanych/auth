const dotenv = require("dotenv");
dotenv.config();
const { authenticator } = require('otplib');

const secret = process.env.MFA_SECRET_KEY

function verifyOTP(userOTP) {
  return authenticator.verify({ token: userOTP, secret });
}

module.exports = verifyOTP;