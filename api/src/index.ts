import express from "express";
import TranslationClient from "./clients/translation";

const config = {
  port: process.env.API_PORT,
};

const api = express();

api.use("/health/ping", (req, res) => {
  res.send("pong");
});

api.listen(config.port, () => {
  console.log(`Server started at: \n`);
  console.log(`\thttp://localhost:${config.port}`);
  console.log(`\tHealth: http://localhost:${config.port}/health/ping`);
});
