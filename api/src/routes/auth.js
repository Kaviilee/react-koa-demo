const auth = require('../controllers/user.js')
const router = require('koa-router')()

// const router = koaRouter()

router.get('/user/:id', auth.getUserInfo)
router.post('/user', auth.postUserAuth)

module.exports = router
