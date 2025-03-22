const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middlewares
app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
