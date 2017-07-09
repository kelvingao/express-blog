var router = require('express').Router();

// on GET request to the url
router.route('/')
    .get(function(req, res) {
        res.render('index', { title: 'liosns'});
    });


module.exports = router;