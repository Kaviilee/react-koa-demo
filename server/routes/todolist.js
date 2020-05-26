const todolist = require('../controllers/todolist.js')
const router = require('koa-router')()

// const router = koaRouter()
// console.log(todolist.getTodolist)

router.get('/todo/:id', todolist.getTodolist)
router.post('/todo', todolist.addTodo)
router.delete('/todo/:user_id/:id', todolist.removeTodo)
router.put('/todo', todolist.updateTodo)
// console.log(router)

module.exports = router