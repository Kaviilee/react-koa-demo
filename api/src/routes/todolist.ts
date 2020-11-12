import { SwaggerRouter } from "koa-swagger-decorator";
import { todolist } from "../controllers";

const listRouter = new SwaggerRouter();

listRouter.get("/api/todo", todolist.getTodolist);
listRouter.post("/api/todo", todolist.addTodo);
listRouter.delete("/api/todo/:id", todolist.removeTodo);
listRouter.put("/api/todo", todolist.updateTodo);

listRouter.mapDir(__dirname);

export default listRouter;