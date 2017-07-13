var router = require('express').Router();
var controller = require(__dirname + '/controller');


router.route('/')
    .get(controller.get)
    .post(controller.post)


router.route('/:id')
    .get(controller.getOne)
    .put(controller.update)
    .delete(controller.delete)

module.exports = router;