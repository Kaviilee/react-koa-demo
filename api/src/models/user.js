const db = require('../config/db.js')
const userModel = '../schema/user.js' // 引入user的表结构
const TodolistDb = db.Todolist // 引入数据库

const User = TodolistDb.import(userModel) // 用sequelize的import方法引入表结构，实例化了User

const getUserById = async function(id) {
    // console.log(id)
    const userInfo = await User.findOne({
        where: {
            id: id
        }
    })

    // console.log(userInfo)

    return userInfo  // 返回数据
}
const getUserByName = async function (name) {
    const userInfo = await User.findOne({
      where: {
        user_name: name
      }
    })

    return userInfo
  }

module.exports = {
    getUserById, // 导出getUserById的方法，将会在controller里调用
    getUserByName
}
