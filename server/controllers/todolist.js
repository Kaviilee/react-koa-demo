const todolist = require('../models/todolist.js')

const getTodolist = async (ctx) => {
    console.log(ctx.params)
    const id = ctx.params.id
    const result = await todolist.getTodolist(id)
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
    const id = ctx.params.id
    const userId = ctx.params.user_id
    let status = ctx.params.status
    status === '0' ? status = true : status = false// 状态反转（更新）

    const success = await todolist.updateTodolist(id, userId, status)

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