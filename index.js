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

let userSchema = mongoose.Schema({
    ToDos:String
})
let userModel = mongoose.model('user_tb',userSchema)
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

 app.get('/' ,(req,res)=>{
        userModel.find((err,result) =>{
        if(err){
            console.log('error occured')
        }
        else{
     res.render('todos', {result})
        }
    });
 }) 
 app.get("/todos",(req,res)=>{
    userModel.find((err,result) =>{
        if(err){
            console.log('error occured')
        }
        else{
       
     res.render('todos', {result})
        }
    });
 });
app.post('/',(req,res)=>{
    userModel.find({ToDos:req.body.ToDos},(err,result)=>{
        console.log(result)
        if( result.length>0) {
           res.render('todos',{message:'oh no, todo already exists!',status:false}) 
        }
        else{
             let form = new userModel(req.body)
              form.save((err)=>{
                if(err){
                    res.redirect('todos')
                }
                 else{
                res.redirect('todos')
                }
               })
           }
       })
})
 app.post('/delete',(req,res)=>{
     let id=req.body.uniqueID;
     userModel.deleteOne({_id:id},(err,result)=>{
          if(err){
        console.log('error occured while deleting')
        res.redirect('todos')
     }
     else{
        console.log('deleted one user')
        res.redirect('todos')
     }
     })
 })
  app.post('/edit',(req,res)=>{
    userModel.find({_id:req.body.uniqueID},(err,result)=>{
         if(err){
             console.log(err)
             console.log('error occured')
         }
         else{
             res.render("edit",{result})
             console.log(result)
         }
     })
 })
 app.post('/update',(req,res)=>{
     let newDetails=req.body;
     let id =req.body.id
     userModel.findByIdAndUpdate(id,newDetails,(err,response)=>{
     if (err){
         console.log("error")
     }
     else{
         console.log(response)
         console.log("updated todo successfully")
         res.redirect('todos')
     }
 })
 })

 app.listen(PORT,()=>{
  console.log(`App is running on port: ${PORT}`);
  })

