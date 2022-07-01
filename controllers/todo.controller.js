const userModel= require('../models/todo.model')
const takeTodo=(req,res)=>{
    userModel.find((err,result) =>{
        if(err){
            console.log('error occured')
        }
        else{
     res.render('index',{result})
        }
    });
 }
const onTodo=(req,res)=>{
    userModel.find({ToDos:req.body.ToDos},(err,result)=>{
        console.log(result)
        if( result.length>0) {
           res.render('index',{message:'oh no, todo already exists!',status:false}) 
        }
        else{
             let form = new userModel(req.body)
              form.save((err)=>{
                if(err){
                    res.redirect('/')
                }
                 else{
                res.redirect('/')
                }
               })
           }
       })
}
const deleteTodo=(req,res)=>{
    let id=req.body.uniqueID;
    userModel.deleteOne({_id:id},(err,result)=>{
         if(err){
       console.log('error occured while deleting')
       res.redirect('/')
    }
    else{
       console.log('deleted one user')
       res.redirect('/')
    }
    })
}

const editTodo=(req,res)=>{
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
 }
const upDateTodo=(req,res)=>{
    let newDetails=req.body;
    let id =req.body.id
    userModel.findByIdAndUpdate(id,newDetails,(err,response)=>{
    if (err){
        console.log("error")
    }
    else{
        console.log(response)
        console.log("updated todo successfully")
        res.redirect('/')
    }
})
}
module.exports={takeTodo,onTodo,deleteTodo,upDateTodo,editTodo}

