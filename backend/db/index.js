const mongoose = require('mongoose');

require('dotenv').config();

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('You successfully connected to MongoDB!');
  } catch (err) {
    console.dir(err, 'DB connection failure');
  }
}

module.exports = { connectToDB };
