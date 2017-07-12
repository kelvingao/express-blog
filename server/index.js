var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

//var mongoose = require('mongoose');
var mongojs = require('mongojs');
var db = mongojs('localhost:27017/myGame', ['account','progress']);

server.use(morgan('dev'));
server.use(bodyParser.urlencoded({extended:true}));

var userRoutes = require(__dirname + '/api/user/router');
var postRoutes = require(__dirname + '/api/post/router')
var categoryRoutes = require(__dirname + '/api/category/router');

server.use('/user', userRoutes);
server.use('/post', postRoutes);
server.use('/category', categoryRoutes);

////////////////////////
var isValidPassword = function(data, cb) {
    db.account.find({username:data.username, password:data.password},function(err, res) {
        if(res.length > 0)
            cb(true);
        else
            cb(false);
    });
}
var isUsernameTaken = function(data, cb) {
    db.account.find({username:data.username},function(err, res) {
        if(res.length > 0)
            cb(true);
        else
            cb(false);
    });
}
var addUser = function(data, cb) {
    db.account.insert({username:data.username, password:data.password},function(err) {
        cb();
    });
}
////////////////////////



server.route('/home')
    .get(function(req, res) {
        res.status(401).send('Unahuthorized');
    })
// root
server.route('/')
    .get(function(req, res) {
        res.redirect('/login');
    }); 

// login
server.route('/login')
    .get(function(req, res) {
        res.render('login');
    })
    .post(function(req, res) {
        console.log(req.body);
        isValidPassword(req.body, function(valid) {
            if(valid) {
                res.redirect('/index');
            } else
                res.status(401).send('Error password');
        })
    });

module.exports = server;