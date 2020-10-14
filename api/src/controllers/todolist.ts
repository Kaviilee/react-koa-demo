import { Context } from "koa";
import { getManager, Repository, Not, Equal, Like, getRepository } from "typeorm";
import { validate, ValidationError } from "class-validator";
import { request, summary, path, body, responsesAll, tagsAll } from "koa-swagger-decorator";

import { List, listSchema } from "../entity/list";
import { token2User } from "../utils";

@responsesAll({ 200: { description: "success"}, 400: { description: "bad request"}, 401: { description: "unauthorized, missing/wrong jwt token"}})
@tagsAll(["List"])
export default class TodoListController {

    @request("get", "/api/todo")
    @summary("Get todolist")
    public static async getTodolist(ctx: Context): Promise<void> {
        const listRepository: Repository<List> = getManager().getRepository(List);

        const { authorization: token } = ctx.request.headers;
        const user: any = token2User(token, "react-koa-demo");
        
        const id = user.id;
        const result = await listRepository.find(id);

        ctx.status = 200;
        ctx.body = result;
    }

    @request("post", "/api/todo")
    @summary("Add todo")
    @body(listSchema)
    public static async addTodo(ctx: Context): Promise<void> {
        const listRepository: Repository<List> = getManager().getRepository(List);

        const todoToBeSave: List = new List();

        const data = ctx.request.body;
        
        todoToBeSave.content = data.content;
        todoToBeSave.status = data.status;

        const { authorization: token } = ctx.request.headers;
        const user: any = token2User(token, "react-koa-demo");
        todoToBeSave.userId = user.id;
        // console.log(token, user)
        const todo = await listRepository.save(todoToBeSave);

        ctx.status = 201;
        ctx.body = todo;
    }

    @request("delete", "/api/todo/{id}")
    @summary("Delete todo")
    @path({
        id: { type: "number", required: true, description: "id of todo" }
    })
    public static async removeTodo(ctx: Context): Promise<void> {
        const listRepository: Repository<List> = getManager().getRepository(List);
        const { id } = ctx.params;
        const { authorization: token } = ctx.request.headers;
        const user: any = token2User(token, "react-koa-demo");

        const todoRemove = await listRepository.findOne({
            where: {
                id,
                userId: user.id
            }
        });

        await listRepository.remove(todoRemove);

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
        const todoToBeUpdate: List = new List();
        const { authorization: token } = ctx.request.headers;
        const userInfo: any = token2User(token, "react-koa-demo");

        const { id, status } = ctx.request.body;

        todoToBeUpdate.id = id;
        todoToBeUpdate.userId = userInfo.id;
        todoToBeUpdate.status = status;

        const user = await listRepository.save(todoToBeUpdate);

        ctx.status = 201;
        ctx.body = user;
    }
}
