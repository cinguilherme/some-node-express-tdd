const express = require('express');

const mainRoute = express.Router();

mainRoute.get('/', (req, res) => {
    return res.json();
})

module.exports = { mainRoute }