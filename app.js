// Require Libraries
const express = require('express');

// App Setup
const app = express();
const bodyParser = require('body-parser')
// Middleware
const exphbs  = require('express-handlebars');
const json = require('body-parser');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
app.get('/', (req, res) => {
    // set the url of the gif
    const gifUrl = 'https://media1.tenor.com/images/561c988433b8d71d378c9ccb4b719b6c/tenor.gif?itemid=10058245'
    // render the hello-gif view, passing the gifUrl into the view to be displayed
    res.render('hello-gif', { gifUrl })
  })


// Start Server
app.listen(7000, () => {
  console.log('Gif Search listening on port localhost:7000!');
});