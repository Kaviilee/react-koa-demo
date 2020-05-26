const todolist = require('../models/todolist.js')
// console.log(todolist)

const getTodolist = async (ctx) => {
    const id = ctx.params.id
    const result = await todolist.getTodolistById(id)
    // console.log(result)
    ctx.body = result
}

const addTodo = async (ctx) => {
    const data = ctx.request.body
    const success = await todolist.addTodo(data)
    
    ctx.body = {
        success: success
    }
}

const removeTodo = async (ctx) => {
    const id = ctx.params.id
    const userId = ctx.params.user_id
    const success = await todolist.removeTodo(id, userId)

    ctx.body = {
        success: success
    }
}


const updateTodo = async (ctx) => {
    console.log(ctx.request)
    const { id, user_id: userId, status } = ctx.request.body

    const success = await todolist.updateTodo(id, userId, status)

    ctx.body = {
        success
    }
}
module.exports = {
    getTodolist,
    addTodo,
    removeTodo,
    updateTodo
}