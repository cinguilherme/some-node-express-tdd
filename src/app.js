require('dotenv').config()
const dbconfig = require('./configs/db');
const express = require('express')

const dbName = process.env.DB_NAME;
dbconfig.connect(dbName);

const app = express()
const todoRoutes = require('./routes/todo.routes');

app.use(express.json());

app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
    return res.json({status: "ok"})
    
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`app listening in ${port}`);
});

module.exports = app;