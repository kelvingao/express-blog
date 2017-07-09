var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

server.use(morgan('dev'));
server.use(bodyParser.json());

var userRoutes = require(__dirname + '/api/user/router');
var postRoutes = require(__dirname + '/api/post/router')
var categoryRoutes = require(__dirname + '/api/category/router');

server.use('/user', userRoutes);
server.use('/post', postRoutes);
server.use('/category', categoryRoutes);

server.get('/', function(req, res) {
    res.render('index', { title: 'Lions'});
});

module.exports = server;