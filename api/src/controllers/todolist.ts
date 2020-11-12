import { Context } from "koa";
import { getManager, Repository, getRepository, getConnection } from "typeorm";
import { validate } from "class-validator";
import { request, summary, path, body, responsesAll, tagsAll } from "koa-swagger-decorator";

import { List, listSchema } from "../entity/list";
import { token2User } from "../utils";

@responsesAll({ 200: { description: "success"}, 400: { description: "bad request"}, 401: { description: "unauthorized, missing/wrong jwt token"}})
@tagsAll(["List"])
export default class TodoListController {

    @request("get", "/api/todo")
    @summary("Get todolist")
    public static async getTodolist(ctx: Context): Promise<void> {

        const { authorization: token } = ctx.request.headers;
        const user: any = token2User(token, "react-koa-demo");
        
        const id = user.id;

        const result = await getRepository(List)
            .createQueryBuilder("list")
            .where("list.userId = :id", { id })
            .orderBy("list.id")
            .getMany();

        ctx.status = 200;
        ctx.body = result;
    }

    @request("post", "/api/todo")
    @summary("Add todo")
    @body(listSchema)
    public static async addTodo(ctx: Context): Promise<void> {

        const list = new List();

        const data = ctx.request.body;

        const { authorization: token } = ctx.request.headers;
        const user: any = token2User(token, "react-koa-demo");

        list.content = data.content;
        list.status = data.status;
        list.userId = user.id;
            
        const errors = await validate(list);

        if (errors.length > 0) {
            ctx.status = 500;
            ctx.body = {
                // error: "Missing attributes"
                error: errors
            };
            // throw new Error("Validation failed");
        } else {
            const todo = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(List)
                .values([list]).execute();
    
            ctx.status = 201;
            ctx.body = todo;
        }
    }

    @request("delete", "/api/todo/{id}")
    @summary("Delete todo")
    @path({
        id: { type: "number", required: true, description: "id of todo" }
    })
    public static async removeTodo(ctx: Context): Promise<void> {

        const { id } = ctx.params;
        const { authorization: token } = ctx.request.headers;
        const user = token2User(token, "react-koa-demo");

        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(List)
            .where("id = :id AND userId = :userId", { id, userId: user.id })
            .execute();

        ctx.status = 204;
    }

    @request("put", "/api/todo")
    @summary("Update todo")
    @body({
        id: { type: "number", required: true, description: "id of todo" },
        user_id: { type: "number", required: true, description: "id of user" },
        status: { type: "boolean", required: true, description: "status of todo" }
    })
    public static async updateTodo(ctx: Context): Promise<void> {

        const listRepository: Repository<List> = getManager().getRepository(List);
        const { authorization: token } = ctx.request.headers;
        const userInfo = token2User(token, "react-koa-demo");

        const { id, status } = ctx.request.body;

        await getRepository(List)
            .createQueryBuilder("list")
            .update()
            .set({ status })
            .where("list.id = :id", { id })
            .andWhere("list.userId = :userId", { userId: userInfo.id })
            .execute();
        
        const user =  await listRepository.findOne({ where: { id }});

        ctx.status = 201;
        ctx.body = user;
    }
}
