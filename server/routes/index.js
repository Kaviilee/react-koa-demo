const router = require('koa-router')()
const jwt = require('koa-jwt')
// const jwt = require('jsonwebtoken')

const auth = require('./auth.js')
const todolist = require('./todolist.js')

router.use('/api', jwt({ secret: 'react-koa-demo' }), todolist.routes(), todolist.allowedMethods())
router.use('/auth', auth.routes(), auth.allowedMethods())
// jwt({ secret: 'react-koa-demo' }),
// console.log(router)

module.exports = router