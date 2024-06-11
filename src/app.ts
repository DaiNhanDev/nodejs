import express, { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import Database from "./db/init";
import appRouter from "./routes";

const app: Express = express();
const PORT = 8080;
app.set("port", process.env.PORT || PORT);

// init middlewares
app.use(morgan("combined"));
app.use(helmet());
app.use(compression());

// connect Database
Database.getInstance();
app.use("/api", appRouter);

export { app };
