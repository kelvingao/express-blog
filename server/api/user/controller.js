//var signToken = require('../util/auth').signToken;
var User = require(__dirname +'/model');
var _ = require('lodash');

exports.get = function(req, res) {
    User.find({})
        .exec(function(err, users) {
            if(err)
                res.send('error has occured');
            else {
                res.json(users);
            }
        })
};

exports.getOne = function(req, res) {
    User.findOne({
        _id: req.params.id
    })
    .exec(function(err, user) {
        if(err)
            res.send('error occured');
        else   
            res.json(user);
    })
}

exports.post = function(req, res) {
    var newUser = new User();

    newUser.username = req.body.username;
    newUser.password = req.body.password;

    newUser.save(function(err, user) {
        if(err) {
            res.send('error saving book');
        } else {
            res.json(user);
        }
    })
}

exports.update = function(req, res) {
    // FIXME: how to update partially fields?
    User.findOneAndUpdate({
        _id: req.params.id
    }, {$set:
        { username: req.body.username, password: req.body.password}}, 
        { upsert: true}, 
        function(err, newUser) {
            if(err)
                console.log('error occurred.');
            else
                res.json(newUser);
        })
}

exports.delete = function(req, res) {
    User.findOneAndRemove({
        _id: req.params.id
    }, function(err, user) {
        if(err)
            console.log("error deleting.");
        else
            res.json(user);
    })
}