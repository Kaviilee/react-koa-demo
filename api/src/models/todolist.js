const db = require('../config/db.js')
const todoModal = '../schema/list.js' // 引入todolist的表结构
const TodolistDb = db.Todolist

const Todolist = TodolistDb.import(todoModal)

const getTodolistById = async function(id) {
    const todolist = await Todolist.findAll({
        where: {
            user_id: id
        },
        attributes: ['id', 'user_id', 'content', 'status'] // 只需返回此三个字段
    })
    return todolist
}

const addTodo = async function(data) {
    console.log(data)
    await Todolist.create({
        user_id: data.id,
        content: data.content,
        status: data.status
    })
}

const removeTodo = async function(id, userId) {
    const result = await Todolist.destroy({
        where: {
            id: id,
            user_id: userId
        }
    })

    return result === 1
}

const updateTodo = async function(id, userId, status) {
    console.log(id, userId, status)
    const result = await Todolist.update(
        {
          status: status
        },
        {
          where: {
            id: id,
            user_id: userId
          }
        }
      )
    return result[0] === 1 // 返回一个数组，更新成功的条目为1否则为0。由于只更新一个条目，所以只返回一个元素
}

module.exports = {
    getTodolistById,
    addTodo,
    removeTodo,
    updateTodo
}