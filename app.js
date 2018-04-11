const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/master/m_users');

//conect to mongo
mongoose.connect("mongodb://localhost:27017/ProjectEvaluasiAPI");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-with, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/api/users', userRoutes);

//utnuk handling error
app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
 });

module.exports = app;