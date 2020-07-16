import { Context } from "koa";
import { getManager, Repository, Not, Equal, Like, getRepository } from "typeorm";
import { validate, ValidationError } from "class-validator";
import { request, summary, path, body, responsesAll, tagsAll } from "koa-swagger-decorator";
import jwt from "jsonwebtoken";

import { List, listSchema } from "../entity/list";

@responsesAll({ 200: { description: "success"}, 400: { description: "bad request"}, 401: { description: "unauthorized, missing/wrong jwt token"}})
@tagsAll(["List"])
export default class TodoListController {

    @request("get", "/api/todo/{id}")
    @summary("Get todolist")
    @path({
        id: { type: "number", required: true, description: "id of user" }
    })
    public static async getTodolist(ctx: Context): Promise<void> {
        const listRepository: Repository<List> = getManager().getRepository(List);
        
        const id = ctx.params.id;
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

        let { authorization: token } = ctx.request.headers;
        token = token.slice(7);
        const user: any = jwt.verify(token, "react-koa-demo");
        todoToBeSave.user_id = user.id;
        // console.log(token, user)
        const todo = await listRepository.save(todoToBeSave);

        ctx.status = 201;
        ctx.body = todo;
    }

    @request("delete", "/api/todo/{user_id}/{id}")
    @summary("Delete todo")
    @path({
        id: { type: "number", required: true, description: "id of todo" },
        user_id: { type: "number", required: true, description: "id of user" },
    })
    public static async removeTodo(ctx: Context): Promise<void> {
        const listRepository: Repository<List> = getManager().getRepository(List);
        const { id, user_id: userId } = ctx.params;

        const todoRemove = await listRepository.findOne({
            where: {
                id,
                user_id: userId
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

        const { id, user_id: userId, status } = ctx.request.body;

        todoToBeUpdate.id = id;
        todoToBeUpdate.user_id = userId;
        todoToBeUpdate.status = status;

        const user = await listRepository.save(todoToBeUpdate);

        ctx.status = 201;
        ctx.body = user;
    }
}
