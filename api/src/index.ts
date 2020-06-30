import express from "express";
import TranslationClient from "./clients/translation";
import PokeClient from "./clients/pokeapi";
import searchHandler from "./handlers/search";
import { Clients } from "./handlers/index.types";

const config = {
  port: process.env.API_PORT!,
  pokeAPIUrl: process.env.POKE_API!,
  translationAPIUrl: process.env.TRANSLATION_API!,
};

Object.keys(config).forEach((k) => {
  const val = (config as any)[k];
  if (typeof val === "undefined" || !val.trim()) {
    throw new Error(`Parameter ${k} is required`);
  }
});

const clients: Clients = {
  poke: PokeClient(config.pokeAPIUrl),
  translate: TranslationClient(config.translationAPIUrl),
};

const api = express();

api.use("/health/ping", (req, res) => {
  res.send("pong");
});

api.use("/search", searchHandler.bind(null, clients));

api.listen(config.port, () => {
  console.log(`Server started at: \n`);
  console.log(`\thttp://localhost:${config.port}`);
  console.log(`\tHealth: http://localhost:${config.port}/health/ping`);
});
