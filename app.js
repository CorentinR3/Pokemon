const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const pathIcon = '/images/favicon.ico';
const sequelize = require('./src/db/sequelize');

// console.log(express());
const app = express();
const port = 3000;

app
.use(favicon(__dirname + pathIcon))
.use(morgan('dev'))
.use(bodyParser.json());

// Route 1 : homePage
app.get('/', (req,res) =>{
    res.send('Hello World');
});
 
app.listen(port);
console.log(`L'application est lancée sur le port ${port}`);