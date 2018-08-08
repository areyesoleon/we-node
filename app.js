// Requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Inicializar variables
const app = express();

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//Import Routes
const companyRoutes = require('./routes/company');
const appRoutes = require('./routes/app');
//Conexion DB
mongoose.connection.openUri('mongodb://localhost:27017/weHome',(err,res)=>{
   if(err) throw err;
   console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online' );
});

//Routes
app.use('/',appRoutes);
app.use('/company',companyRoutes);

//Escuchar peteciones
app.listen(3000, ()=>{
  console.log('express server 3000: \x1b[32m%s\x1b[0m', 'online' );
});