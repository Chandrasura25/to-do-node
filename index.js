const express = require('express');
const app = express();
const path = require("path");
const ejs = require("ejs");
const PORT = process.env.PORT||2000
require('dotenv').config()
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
const URI = process.env.MONGO_URI
const mongoose = require('mongoose')
app.use(express.static(__dirname+'/public'));
const todoRouter =require('./routes/todo.route')
app.use('/',todoRouter);
mongoose.connect(URI,(err)=>{
    if(err){
        console.log(err)
        console.log(`mongoose isn't connected`)
    }
    else{
        console.log(`moogoose is connected`)
    }
})
 app.set("view engine","ejs"); 



 app.listen(PORT,()=>{
  console.log(`App is running on port: ${PORT}`);
  })

