const todolist = require('../controllers/todolist.js')
const router = require('koa-router')()

// const router = koaRouter()
// console.log(todolist.getTodolist)

router.get('/todo/:id', todolist.getTodolist)
router.post('/todo', todolist.addTodo)

module.exports = router