require('dotenv').config()
const dbconfig = require('./configs/db');
const express = require('express')

const dbName = process.env.DB_NAME;
dbconfig.connect(dbName);

const app = express()
const todoRoutes = require('./routes/todo.routes');

app.use(express.json());

app.use('/todos', todoRoutes);

app.use((error, req, res) => {
    res.status(500)
        .json({ message: error.message })
        .send();
});

app.get('/', (req, res) => {
    return res.json({ status: "ok" })

})

module.exports = app;