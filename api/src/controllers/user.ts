// import user from '../models/user'
import { Context } from "koa";
import { getManager, Repository, Not, Equal, Like, getRepository } from "typeorm";
import { validate, ValidationError } from "class-validator";
import { request, summary, path, body, responsesAll, tagsAll } from "koa-swagger-decorator";
import jwt from "jsonwebtoken";
import { User, userSchema } from "../entity/user";
import { token2User } from "../utils";
// const bcrypt = require('bcryptjs') // 加密密码

@responsesAll({ 200: { description: "success"}, 400: { description: "bad request"}, 401: { description: "unauthorized, missing/wrong jwt token"}})
@tagsAll(["User"])
export default class UserController {

    @request("get", "/auth/me")
    public static async getUserInfo(ctx: Context): Promise<void> {
        const userRepository: Repository<User> = getRepository(User);

        const { authorization: token } = ctx.request.headers;
        if (!token) {
            ctx.body = "unauthorized";
            ctx.status = 401;
        } else {
            const user: any = token2User(token, "react-koa-demo");
    
            // const id = user.id;
            const { id, userName } = await userRepository.findOne(user.id);
            ctx.body = {
                id,
                name: userName
            };
        }
    }

    @request("post", "/auth/user")
    @summary("login with user_name and password")
    @body(userSchema)
    public static async postUserAuth(ctx: Context): Promise<void> {
        const userRepository: Repository<User> = getManager().getRepository(User);

        const userUpdate: User = new User();

        const data = ctx.request.body;
        // const data = JSON.parse(datas);
        console.log(data);
        const userInfo: User = await userRepository.findOne({
            where: {
                userName: data.name
            }
        });

        if (userInfo) {
            if (userInfo.password !== data.password) {
                ctx.status = 400;
                ctx.body = {
                    error: "wrong password!"
                };
            } else {
                const userToken = {
                    name: userInfo.userName,
                    id: userInfo.id
                };
                
                const secret = process.env.JWT_SECRET || "react-koa-demo";
                const token = jwt.sign(userToken, secret); // 签发token
                userUpdate.token = token;
                userUpdate.userName = userInfo.userName;
                userUpdate.id = userInfo.id;
                await userRepository.save(userUpdate);
                // const token = userToken // 签发token
                ctx.body = {
                    success: true,
                    token: token
                };
            }
        } else {
            ctx.status = 400;
            ctx.body = {
                error: "user is not exist!"
            };
        }
    }
}