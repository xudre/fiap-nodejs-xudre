require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");

const routes = require('./routes');

const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

app.use(routes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
