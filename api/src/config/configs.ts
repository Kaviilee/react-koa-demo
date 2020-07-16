import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export type Config = {
    port: number |string;
    dbport: number | string;
    database: string;
    username: string;
    password: string;
    host: string;
    jwtSecret: string;
    debugLogging: boolean;
}

const isDev = process.env.NODE_ENV === "development";

const config: Config = {
    port: process.env.PORT || 8080,
    database: process.env.DB_NAME || "todolist",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    host: process.env.DB_HOST || "localhost",
    dbport: process.env.DB_PORT || 3306,
    jwtSecret: process.env.JWT_SECRET || "react-koa-demo",
    debugLogging: isDev
};

export { config };
