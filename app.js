// Require Libraries
const express = require('express');

// App Setup
const app = express();

// Middleware

// Routes
app.get('/', (req, res) => {
    res.send('Hello Squirrel');
  });
// Start Server

app.listen(7000, () => {
  console.log('Gif Search listening on port localhost:7000!');
});