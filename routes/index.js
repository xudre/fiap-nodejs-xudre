const express = require('express');
const verifyToken = require('../middleware/verifyToken');

// Rotas:
const auth = require('./auth');
const users = require('./users');

const router = express.Router();

router.use('/auth', auth);
router.use('/users', verifyToken, users);

module.exports = router;
