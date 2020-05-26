const Koa = require('koa')
const json = require('koa-json')
const logger = require('koa-logger')
const path = require('path')
const serve = require('koa-static')
const koaBodyparser = require('koa-bodyparser')
const router = require('./server/routes')

const app = new Koa()

app.use(koaBodyparser())
    .use(json())
    .use(logger())
    .use(router.routes())

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

app.use(serve(path.resolve('dist')))

app.on('error', (err, ctx) => {
    logger('server error', err)
})

app.listen('8889', () => {
    console.log('Koa is listening in 8889')
})


module.exports = app