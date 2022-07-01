const express = require("express")
require('dotenv').config()
const router = express.Router()
const todoController = require('../controllers/todo.controller')
router.get("/", todoController.takeTodo);
router.post('/',todoController.onTodo);
router.post('/delete',todoController.deleteTodo);
router.post('/edit',todoController.editTodo);
router.post('/update',todoController.upDateTodo);
module.exports =router;
