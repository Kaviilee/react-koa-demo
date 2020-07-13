const { Sequelize } = require('sequelize') // 引入sequelize

console.log('init sequelize...')

// 使用url连接的方式进行连接
var Todolist = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    define: {
        timestamps: false // 取消sequelize自动给数据表加入时间戳，会影响查询返回500 （createdAt和updatedAt）
    }
})

module.exports = {
    Todolist
}
