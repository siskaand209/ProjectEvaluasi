const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/master/m_users');
const productRoutes = require('./api/routes/master/m_products');
const menuRoutes = require('./api/routes/master/m_menus');
const roleRoutes = require('./api/routes/master/m_roles');
const employeeRoutes = require('./api/routes/master/m_employees');
const menuAccessRoutes = require('./api/routes/master/m_menuaccesses');
const companiesRoutes = require('./api/routes/master/m_companies');

//conect to mongo
//password admin01
// mongoose.connect("mongodb://localhost:27017/ProjectEvaluasiAPI");
mongoose.connect("mongodb://admin01:admin01@ds247439.mlab.com:47439/projectevaluasi");
mongoose.Promise = global.Promise;

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
app.use('/api/products', productRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/menuaccesses', menuAccessRoutes);
app.use('/api/companies', companiesRoutes);


app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
 });

module.exports = app;