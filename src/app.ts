import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import Database from "./db/init";
const app = express();
const PORT = 8080;
app.set("port", process.env.PORT || PORT);

// init middlewares
app.use(morgan("combined"));
app.use(helmet());
app.use(compression());

// connect Database
Database.getInstance();

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "wellcome",
  });
});
export { app };
