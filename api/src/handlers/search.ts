import { Handler } from "./index.types";
import { Response } from "express";

const handleError = (res: Response, code: number, message: string) => {
  res.status(code);
  res.send(message);
};

const searchHandler: Handler = async ({ poke, translate }, req, res) => {
  const speciesName = req.params["pokemon"];

  if (typeof speciesName !== "string") {
    return handleError(res, 400, 'Missing "pokemon" parameter');
  }

  const [pokeError, pokemon] = await poke.getSpecies(speciesName);

  if (pokeError) {
    return handleError(res, 404, `Pokemon Error: ${pokeError.message}`);
  } else if (!pokemon) {
    return handleError(res, 500, "Pokemon Error");
  }

  const [translationError, translatedText] = await translate.shakespeare(
    pokemon.description
  );

  if (translationError) {
    return handleError(
      res,
      500,
      `Translation Error: ${translationError.message}`
    );
  }

  res.send({ ...pokemon, description: translatedText });
};

export default searchHandler;
