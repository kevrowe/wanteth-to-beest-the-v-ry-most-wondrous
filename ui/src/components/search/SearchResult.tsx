import React from "react";
import Favourite from "../favourites/FavouriteButton";

interface Props {
  pokemon: string;
  description: string;
  isFavourite: boolean;
  toggleFavourite: (pokemon: string) => void;
}

export default ({
  isFavourite,
  toggleFavourite,
  pokemon,
  description,
}: Props) => (
  <article>
    <h2>
      <Favourite
        isFavourite={isFavourite}
        toggle={toggleFavourite.bind(null, pokemon.toLowerCase())}
      />
      {pokemon}
    </h2>
    <p>{description}</p>
  </article>
);
