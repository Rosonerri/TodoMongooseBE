console.clear()
import express, { Application } from "express";
import cors from "cors";
import { mainApp } from "./mainApp";
import { mainConnection } from "../Backend/Utils/dbConfig";

const app: Application = express();
const port: number = 7500;

app.use(cors());
app.use(express.json());

mainApp(app);

const server = app.listen(port, () => {
    mainConnection()
});

process.on("uncaughtException", (err: Error) => {
  console.log("uncaughtException: ", err);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection: ", reason);

  server.close(() => {
    process.exit(1);
  });
});
