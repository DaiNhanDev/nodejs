import express, { Express, urlencoded } from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import Database from "./db/init";
import appRouter from "./routes";
import docsRouter from "./routes/swagger";
import { errorHandler, notFoundErrorHandler } from "./middlewares/error";
import deserializeUser from "./middlewares/deserializeUser";

const app: Express = express();
const PORT = 8000;
app.set("port", process.env.PORT || PORT);

// init middlewares
app.use(morgan("common"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  }),
);
// connect Database
Database.getInstance();

app.use(deserializeUser);
app.use("/api/docs", docsRouter);
app.use("/api/v1", appRouter);

// handle error
app.use(notFoundErrorHandler);
app.use(errorHandler);

export { app };
