import React from "react";
import Favourite from "../favourites/FavouriteButton";
import { Pokemon } from "../../api/search";
import styled from "styled-components";

interface Props {
  result: Pokemon;
  isFavourite: boolean;
  toggleFavourite: (pokemon: string) => void;
}

const Heading = styled.h2`
  text-transform: capitalize;
`;

const Body = styled.div`
  display: flex;

  img {
    width: 100px;
  }

  p {
    flex-grow: 1;
  }
`;

export default ({ isFavourite, toggleFavourite, result }: Props) => (
  <article>
    <Heading>
      <Favourite
        isFavourite={isFavourite}
        toggle={toggleFavourite.bind(null, result.name.toLowerCase())}
      />
      {result.name}
    </Heading>
    <Body>
      {result.id > 0 && (
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.id}.png`}
          alt={result.name}
        />
      )}
      <p>{result.description}</p>
    </Body>
  </article>
);
