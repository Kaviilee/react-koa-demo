const user = require('../models/user.js')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs') // 加密密码

const getUserInfo = async (ctx) => {
    // console.log(ctx)
    const id = ctx.params.id
    const result = await user.getUserById(id)
    ctx.body = result
}

const postUserAuth = async (ctx) => {
    // console.log(ctx.request.body)
    const data = ctx.request.body
    // ctx.body = {
    //     success: true,
    //     token: '123421312'
    // }
    const userInfo = await user.getUserByName(data.name)
    console.log(userInfo)

    if (userInfo !== null) {
        //!bcrypt.compareSync(data.password, userInfo.password)
        // $2a$10$x3f0Y2SNAmyAfqhKVAV.7uE7RHs3FDGuSYw.LlZhOFoyK7cjfZ.Q6
        if (userInfo.password !== data.password) {
            ctx.body = {
                success: false,
                info: '密码错误！'
            }
        } else {
            // console.log(userInfo)
            const userToken = {
                name: userInfo.user_name,
                id: userInfo.id
            }
            const secret = 'react-koa-demo' // 指定密钥，用来判断token合法性的标志
            const token = jwt.sign(userToken, secret) // 签发token
            // const token = userToken // 签发token
            console.log(token)
            ctx.body = {
                success: true,
                token: token
            }
        }
    } else {
        ctx.body = {
            success: false,
            info: '用户不存在'
        }
    }
}

module.exports = {
    getUserInfo, // 把获取用户信息的方法暴露出去
    postUserAuth
}