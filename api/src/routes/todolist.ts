import { SwaggerRouter } from "koa-swagger-decorator";
import { todolist } from "../controllers";

const listRouter = new SwaggerRouter();

listRouter.get("/api/todo/:id", todolist.getTodolist);
listRouter.post("/api/todo", todolist.addTodo);
listRouter.delete("/api/todo/:user_id/:id", todolist.removeTodo);
listRouter.put("/api/todo", todolist.updateTodo);
// console.log(router)

listRouter.mapDir(__dirname);

export default listRouter;