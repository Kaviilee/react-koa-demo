import Koa from "koa";
import jwt from "koa-jwt";
import winston from "winston";
import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import "reflect-metadata";
import { createConnection } from "typeorm";

import { logger } from "./src/config/logger";
import { config } from "./src/config/configs";
import { userRouter, listRouter } from "./src/routes";

// create connection with database
createConnection({
    type: "mysql",
    url: `mysql://${config.username}:${config.password}@${config.host}:${config.dbport}/${config.database}`,
    entities: [
        "src/entity/*.ts"
     ],
    logging: false
}).then(async () => {
    
    const app = new Koa();
    
    app.use(bodyParser());
    // Provides important security headers to make your app more secure
    app.use(helmet());
    // Enable cors with default options
    app.use(cors());
    // Logger middleware -> usr winston as logger (logger.ts with config)
    app.use(logger(winston));
    // these routes are not protected by the JWT middleware
    app.use(userRouter.routes()).use(userRouter.allowedMethods());

    app.use(jwt({ secret: config.jwtSecret }).unless({ path: [/^\/swagger-/] }));

    app.use(listRouter.routes()).use(listRouter.allowedMethods());
    
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });

}).catch((error: string) => {
    console.log("TypeORM connection error: ", error);
});
