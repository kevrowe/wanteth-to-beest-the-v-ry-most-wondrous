import React from "react";
import styled from "styled-components";

interface Props {
  favourites: Set<string>;
  onClick: (pokemon: string) => void;
}

const List = styled.ul`
  display: flex;
  list-style: none;
  padding: 0 20px 20px;

  li {
    cursor: pointer;
    padding: 10px;

    &:hover {
      background: #ddd;
    }
  }
`;

export default ({ favourites, onClick }: Props) => {
  if (favourites.size === 0) {
    return null;
  }

  return (
    <List>
      {Array.from(favourites.values()).map((p) => (
        <li key={p} onClick={onClick.bind(null, p)}>
          <span role="img" aria-label="star">
            🌟{" "}
          </span>
          {p}
        </li>
      ))}
    </List>
  );
};
