import { user } from "../controllers";
import { SwaggerRouter } from "koa-swagger-decorator";

const userRouter = new SwaggerRouter();

userRouter.get("/auth/me", user.getUserInfo);
userRouter.post("/auth/user", user.postUserAuth);
userRouter.post("/auth/register", user.registerUser);

userRouter.mapDir(__dirname);

export default userRouter;
