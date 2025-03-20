const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectToDB } = require('./db');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/api/v1', routes);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
  connectToDB();
});
