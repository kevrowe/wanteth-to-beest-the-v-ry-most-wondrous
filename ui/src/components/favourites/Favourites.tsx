import React from "react";

interface Props {
  favourites: Set<string>;
  onClick: (pokemon: string) => void;
}

export default ({ favourites, onClick }: Props) => {
  return (
    <ul>
      {Array.from(favourites.values()).map((p) => (
        <li key={p} onClick={onClick.bind(null, p)}>
          {p}
        </li>
      ))}
    </ul>
  );
};
