const express = require('express');

const router = express.Router();

router.get('/:id', (req, res) => {
    res.send(`Eu recebi o parâmetro ${req.params.id}`);
});

module.exports = router;
