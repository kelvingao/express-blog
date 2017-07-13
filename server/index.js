var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

var mongoose = require('mongoose');
var User = require(__dirname + '/api/user/model');

var db = 'mongodb://localhost:27017/expressblog';
mongoose.connect(db);

server.use(morgan('dev'));
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

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
var config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3000,
  // 10 days in minutes
  expireTime: 24 * 60 * 10,
  secrets: {
    jwt: process.env.JWT || 'gumball'
  }
};


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
                console.log(req.body);
                res.json({success:'OK'});
            } else
                //res.render('login');
                config.log(req.body);
                res.json({success:'false'});
        })
    });

module.exports = server;