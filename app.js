// Require Libraries
const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const giphyRandom = require("giphy-random");

// Middleware
const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
var giphyURL;
app.get('/', (req, res) => {
    const url = "http://api.giphy.com/v1/gifs/search?api_key=qF9pp6xP32yEqyguSGNHYDKfUaAXJYQC&q=lol&limit=25&offset=0&rating=g&lang=en";
    http.get(url, (response) => {
        // SET ENCODING OF RESPONSE TO UTF8
        response.setEncoding('utf8');
        let body = '';
        // listens for the event of the data buffer and stream
        response.on('data', (d) => {
            // CONTINUOUSLY UPDATE STREAM WITH DATA FROM GIPHY
             body += d;
        });
        // once it gets data it parses it into json 
        response.on('end', () => {
            // WHEN DATA IS FULLY RECEIVED PARSE INTO JSON
            let parsed = JSON.parse(body);
            // RENDER THE HOME TEMPLATE AND PASS THE GIF DATA IN TO THE TEMPLATE
            res.render('hello-gif', { gifs: parsed.data })
        });
    });
    
});

// TO BE DONE
app.delete('/delte/:id', function (req, res) {
    const { id } = req.params;
    res.send('Got a DELETE request at /user')
  })

// Start Server
app.listen(7000, () => {
  console.log('Gif Search listening on port localhost:7000!');
});