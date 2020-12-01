// Require Libraries
const http = require('http');
const path = require('path');
const express = require('express');
const app = express();

// Middleware
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var url = "http://api.giphy.com/v1/gifs/search?api_key=qF9pp6xP32yEqyguSGNHYDKfUaAXJYQC&q=lol&limit=25&offset=0&rating=g&lang=en";
var parsed;

// Routes
// GET METHOD
app.get('/', (req, res) => {
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
            parsed = JSON.parse(body);
            // RENDER THE TEMPLATE AND PASS THE GIF DATA IN TO THE TEMPLATE
            res.render('hello-gif', { gifs: parsed.data })
        });
    });
});

// DELETE OPERATION --> POST METHOD
app.post('/delete/:id', function (req, res) {
    const ID  = req.params.id;
    var arrayID = [];
    
    for(var i = 0; i < parsed.data.length; i++) {
      if(parsed.data[i].id == ID) {
        var x = parsed.data.splice(i, 1);
        break;
      }
    }
        // RENDER THE TEMPLATE AND PASS THE GIF DATA IN TO THE TEMPLATE
         res.render('hello-gif', { gifs: parsed.data })
})

// TO BE DONE
app.post('/edit/:id', function (req, res) {
  const ID  = req.params.id;
  var arrayID = [];
  
  
  for(var i = 0; i < parsed.data.length; i++) {
    if(parsed.data[i].id == ID) {
      var x = parsed.data.splice(i, 1);
      break;
    }
  }
      // RENDER THE TEMPLATE AND PASS THE GIF DATA IN TO THE TEMPLATE
       res.render('hello-gif', { gifs: parsed.data })
})
// Start Server
app.listen(7000, () => {
  console.log('Gif Search listening on port localhost:7000!');
});