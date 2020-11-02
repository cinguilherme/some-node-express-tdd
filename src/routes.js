const express = require('express');

const mainRoute = express.Router();

mainRoute.get('/', (req, res) => {
    return res.json();
})

export default mainRoute;