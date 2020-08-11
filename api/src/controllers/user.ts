// import user from '../models/user'
import { Context } from "koa";
import { getManager, Repository, Not, Equal, Like, getRepository } from "typeorm";
import { validate, ValidationError } from "class-validator";
import { request, summary, path, body, responsesAll, tagsAll } from "koa-swagger-decorator";
import jwt from "jsonwebtoken";
import { User, userSchema } from "../entity/user";
// const bcrypt = require('bcryptjs') // 加密密码

@responsesAll({ 200: { description: "success"}, 400: { description: "bad request"}, 401: { description: "unauthorized, missing/wrong jwt token"}})
@tagsAll(["User"])
export default class UserController {

    @request("get", "/auth/user/{id}")
    @summary("Find user by id")
    @path({
        id: { type: "number", required: true, description: "id of user" }
    })
    public static async getUserInfo(ctx: Context): Promise<void> {
        const userRepository: Repository<User> = getRepository(User);

        const id = ctx.params.id;
        const result = await userRepository.findOne(id);
        ctx.body = result;
    }

    @request("post", "/auth/user")
    @summary("login with user_name and password")
    @body(userSchema)
    public static async postUserAuth(ctx: Context): Promise<void> {
        const userRepository: Repository<User> = getManager().getRepository(User);

        const data = ctx.request.body;
        // const data = JSON.parse(datas);
        console.log(data);
        const userInfo: User = await userRepository.findOne({
            where: {
                user_name: data.name
            }
        });

        if (userInfo) {
            if (userInfo.password !== data.password) {
                ctx.status = 400;
                ctx.body = {
                    success: false,
                    message: "wrong password!"
                };
            } else {
                const userToken = {
                    name: userInfo.user_name,
                    id: userInfo.id
                };
                
                const secret = process.env.JWT_SECRET || "react-koa-demo";
                const token = jwt.sign(userToken, secret); // 签发token
                // const token = userToken // 签发token
                ctx.body = {
                    success: true,
                    token: token
                };
            }
        } else {
            ctx.status = 400;
            ctx.body = {
                success: false,
                message: "user is not exist!"
            };
        }
    }
}