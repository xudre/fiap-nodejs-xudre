const express = require('express');
const UsersController = require('../controller/Users');
const verifyToken = require('../middleware/verifyToken');

const controller = new UsersController();
const router = express.Router();

router.post('/', controller.post);
router.get('/:id', verifyToken, controller.get);
router.put('/:id', verifyToken, controller.put);
router.delete('/:id', verifyToken, controller.delete);

module.exports = router;
