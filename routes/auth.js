const express = require('express');
const AuthControl = require('../controller/Auth');

const control = new AuthControl();
const router = express.Router();

router.post('/', control.validate);

module.exports = router;
