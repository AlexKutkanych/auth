const User = require('../models/User');
var jwt = require('jsonwebtoken');
const { handleError } = require('../utils/authErrorHandler');

const createToken = (id) =>
  jwt.sign({ id }, process.env.AUTH_SECRET, {
    expiresIn: process.env.COOKIE_MAX_AGE,
  });

module.exports = {
  async loginUser(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all the fields' });
      }

      const user = await User.login(email, password);

      if (!user) {
        return res
          .status(400)
          .json({ message: 'Wrong email and/or password!' });
      }

      console.log(process.env.COOKIE_MAX_AGE)
      const token = createToken(user._id);
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: process.env.COOKIE_MAX_AGE * 1000,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        // sameSite: 'strict',
      });

      console.log(user.toObject());

      return res.status(200).json({
        status: 'ok',
        message: 'User successfully logged in',
        user,
        hasToken: true,
      });
    } catch (err) {
      const errors = handleError(err);
      res.status(400).json({ errors });
    }
  },
  async signupUser(req, res) {
    try {
      const username = req.body.name;
      const email = req.body.email;
      const password = req.body.password;

      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please enter all the fields' });
      }

      const user = await User.create({
        username,
        email,
        password,
      });

      const token = createToken(user._id);
      delete user.password;

      console.log(user.toObject());

      /* 
        to make cookies set in browser (due to different domains):
        - add localhost to cors whitelist
        - add withCredentials: true for axios
      */
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: process.env.COOKIE_MAX_AGE * 1000,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        // sameSite: 'strict',
      });
      res.status(201).json({
        status: 'ok',
        message: 'User successfully created!',
        user: user.toObject(),
        hasToken: true,
      });
    } catch (err) {
      const errors = handleError(err);
      res.status(400).json({ errors });
    }
  },
  async logoutUser(req, res) {
    try {
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
      });
      res
        .status(200)
        .json({ status: 'ok', message: 'User successfully logged out!' });
    } catch (err) {
      const errors = handleError(err);
      res.status(400).json({ errors });
    }
  },
};
