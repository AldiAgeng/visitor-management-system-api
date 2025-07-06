import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import { Model } from "objection";
import { config } from "dotenv";

config();

import knexInstance from "./databases";
import { route } from "./routes/route";

const PORT = process.env.PORT || 3000;
const app: Express = express();

Model.knex(knexInstance);

app.use(cors({
  origin: '*'
}));

// tes
app.use(morgan("combined"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "2mb" }));

app.use("/api/v1", route);

app.use((req, res) => {
  res.status(404).json({
    code: 404,
    status: "error",
    message: "Route not found",
    data: null,
  });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
