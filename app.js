const Koa = require('koa')
const json = require('koa-json')
const logger = require('koa-logger')
const koaBodyparser = require('koa-bodyparser')
// const router = require('koa-router')()
// const auth = require('./server/routes/auth')
// const todo = require('./server/routes/todolist')
const router = require('./server/routes')

const app = new Koa()
// const router = koaRouter()

app.use(koaBodyparser())
    .use(json())
    .use(logger())
    .use(router.routes())
// router.use('/auth', auth.routes())
// router.use('/todo', todo.routes())
// app.use(router.routes())

app.use(async (ctx, next) => {
    let start = new Date();
    await next
    let ms = new Date() - start
    console.log('%s %s %s %s', ctx.method, ctx.url, ctx.status, ms) // 显示执行的时间
})

app.use(async (ctx, next) => {
    try {
        await next
    } catch (err) {
        if (err.status === 401) {
            ctx.status = 401
            ctx.body = {
                success: false,
                token: null,
                info: 'Protected resource, use Authorization header to get access'
            }
        } else {
            ctx.status = err.status || 500
            ctx.body = err.message
            console.error(err)
        }
    }
})

// router.use('/auth', auth.routes())
// app.use(router.routes())


app.on('error', (err, ctx) => {
    logger('server error', err)
})

app.listen('8889', () => {
    console.log('Koa is listening in 8889')
})


module.exports = app