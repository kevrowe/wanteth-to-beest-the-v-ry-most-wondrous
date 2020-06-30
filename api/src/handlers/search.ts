import { Handler } from "./index.types";
import { Response } from "express";

const handleError = (res: Response, code: number, message: string) => {
  res.status(code);
  res.send(message);
};

const searchHandler: Handler = async ({ poke, translate }, req, res) => {
  const species = req.query["pokemon"];

  if (typeof species !== "string") {
    return handleError(res, 400, 'Missing "pokemon" parameter');
  }

  const [pokeError, flavorText] = await poke.getDescription(species);

  if (pokeError) {
    return handleError(res, 404, `Pokemon Error: ${pokeError.message}`);
  } else if (!flavorText) {
    return handleError(res, 500, "Pokemon Error");
  }

  const [translationError, translatedText] = await translate.shakespeare(
    flavorText
  );

  if (translationError) {
    return handleError(
      res,
      500,
      `Translation Error: ${translationError.message}`
    );
  }

  res.send(translatedText);
};

export default searchHandler;
