const express = require('express');
const UsersController = require('../controller/Users');

const controller = new UsersController();
const router = express.Router();

router.post('/', controller.post);
router.get('/:id', controller.get);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;
