const express = require('express');
const UsersControl = require('../controller/Users');

const control = new UsersControl();
const router = express.Router();

router.get('/:id', control.get);

module.exports = router;
