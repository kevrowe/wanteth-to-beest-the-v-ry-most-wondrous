import React from "react";
import styled from "styled-components";

interface Props {
  isFavourite: boolean;
  toggle: () => void;
}

const Icon = styled.span`
  font-size: 3rem;
  vertical-align: middle;
  margin-right: 10px;
  cursor: pointer;
`;

export default ({ isFavourite, toggle }: Props) => {
  const label = isFavourite
    ? "click to remove from favourites"
    : "click to add to favourites";

  const icon = isFavourite ? "🔴" : "⚪️";

  return (
    <Icon role="img" aria-label={label} onClick={toggle}>
      {icon}
    </Icon>
  );
};
