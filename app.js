var express = require('express');
var app = express();

var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var lions = [];
var id = 0;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'client')));

// on GET request to the url
app.get('/', function(req, res) {
    res.render('index', { title: 'Lions'});
});

app.get('/lions', function(req, res) {
    res.json(lions);
});

// when client post lion json, use this router
app.post('/lions', function(req, res) {
  var lion = req.body;
  id++;
  lion.id = id + '';

  lions.push(lion);
  res.json(lion);
});

// start server on port 3000
app.listen(process.env.PORT || 3000);
console.log('Server started.');