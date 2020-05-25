const Router = require('koa-router')
const router = new Router()
// const jwt = require('koa-jwt')
// const jwt = require('jsonwebtoken')

const auth = require('./auth.js')
const todolist = require('./todolist.js')

router.use('/auth', auth.routes())
router.use('/todo', todolist.routes())
// jwt({ secret: 'react-koa-demo' }),
// console.log(router)

module.exports = router