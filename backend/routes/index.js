const router = require('express').Router();
const authRoutes = require('./api/auth-routes');

router.use('/auth', authRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
