const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');
const { handleError } = require('../utils/authErrorHandler');
const verifyOTP = require('../utils/verify');

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
  async googleLogin(req, res) {
    try {
      const user = jwtDecode(req.body.credential);

      if (!user || !user?.email_verified) {
        res.status(400).json({ message: 'Error decoding token' });
      }

      const userInDB = await User.findOne({ email: user?.email });

      let finalUser;

      if (userInDB) {
        // Update any necessary information for existing user
        finalUser = userInDB;
        finalUser.googleId = user.sub; // Ensure Google ID is up-to-date
        await finalUser.save();
      } else {
        const { name, email, sub: googleId } = user;
        finalUser = await User.create({
          username: name,
          email,
          password: Math.random().toString().slice(-6),
          googleId,
        });
      }

      const token = createToken(finalUser._id);
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: process.env.COOKIE_MAX_AGE * 1000,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        // sameSite: 'strict',
      });

      res.status(200).json({
        status: 'ok',
        message: 'User successfully logged in!',
        user: finalUser.toObject(),
        hasToken: true,
      });
    } catch (error) {
      res.status(400).json({ error, message: 'Error login to google' });
    }
  },
  async checkUser(req, res) {
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

      return res.status(200).json({
        status: 'ok',
        message: 'Please check OTP',
        redirectPath: '/verify-otp',
      });
    } catch (err) {
      const errors = handleError(err);
      res.status(400).json({ errors });
    }
  },
  async verifyOtp(req, res) {
    try {
      const otp = req.body.otp;
      const email = req.body.email;
      const password = req.body.password;

      if (!otp) {
        return res.status(400).json({ message: 'Please enter OTP!' });
      }

      const isValidOTP = verifyOTP(otp);

      if (!isValidOTP) {
        throw new Error('incorrect otp');
      }

      const user = await User.login(email, password);

      if (!user) {
        return res
          .status(400)
          .json({ message: 'Wrong email and/or password!' });
      }

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
      console.log(err);
      const errors = handleError(err);
      res.status(400).json({ errors });
    }
  },
};
