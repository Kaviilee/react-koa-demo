// import user from '../models/user'
import { Context } from "koa";
import { getRepository, getConnection } from "typeorm";
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
        const { authorization: token } = ctx.request.headers;
        if (!token) {
            ctx.body = "unauthorized";
            ctx.status = 401;
        } else {
            const user = token2User(token, "react-koa-demo");

            const { id, userName } = await getRepository(User)
                .createQueryBuilder("user")
                .where("user.id = :id", { id: user.id })
                .getOne();

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
        const data = ctx.request.body;
        // const data = JSON.parse(datas);
        const userInfo: User = await getRepository(User)
            .createQueryBuilder("user")
            .where("user.userName = :name", { name: data.name })
            .getOne();

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

                await getConnection()
                    .createQueryBuilder()
                    .update(User)
                    .set({
                        token
                    }).where("id = :id", { id: userInfo.id }).execute();
                ctx.status = 201;
                ctx.body = {
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

    @request("post", "/auth/register")
    @summary("register new user")
    @body(userSchema)
    public static async registerUser(ctx: Context): Promise<void> {
        const data = ctx.request.body;

        const u = await getRepository(User)
            .createQueryBuilder("user")
            .having("user.userName = :name", { name: data.name })
            .getOne();

        console.log(u);
        if (u) {
            ctx.status = 400;
            ctx.body = {
                message: "existing user"
            };
        } else {
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    userName: data.name,
                    password: data.password
                }).execute();

            ctx.status = 201;
            ctx.body = {
                message: "create user success"
            };
        }
    }
}