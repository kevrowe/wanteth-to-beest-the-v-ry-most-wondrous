import { Handler as ExpressHandler } from "express";
import { TranslationClient } from "../clients/translation";
import { PokeClient } from "../clients/pokeapi";

export interface Clients {
  translate: TranslationClient;
  poke: PokeClient;
}

export type Handler = ExpressHandler extends (...a: infer U) => infer R
  ? (clients: Clients, ...a: U) => R
  : never;
