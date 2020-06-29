import express from "express";
import config from "../config.json";
import TranslationClient from "./clients/translation";

const api = express();

api.use("/health/ping", (req, res) => {
  res.send("pong");
});

api.listen(config.api.port, () => {
  console.log(`Server started at: \n`);
  console.log(`\thttp://localhost:${config.api.port}`);
  console.log(`\tHealth: http://localhost:${config.api.port}/health/ping`);
});
