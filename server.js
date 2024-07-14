require('dotenv').config();
const express = require('express');
const bot = require('./src/bot');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello! The bot is running.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
