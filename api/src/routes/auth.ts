import { user } from "../controllers";
import { SwaggerRouter } from "koa-swagger-decorator";

const userRouter = new SwaggerRouter();

userRouter.get("/auth/user/:id", user.getUserInfo);
userRouter.post("/auth/user", user.postUserAuth);

userRouter.mapDir(__dirname);

export default userRouter;
