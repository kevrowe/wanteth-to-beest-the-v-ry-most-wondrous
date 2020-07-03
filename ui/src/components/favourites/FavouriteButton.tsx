import React from "react";
import styled from "styled-components";

interface Props {
  isFavourite: boolean;
  toggle: () => void;
  disabled: boolean;
}

const Icon = styled.span`
  font-size: 3rem;
  vertical-align: middle;
  margin-right: 10px;
  cursor: pointer;
`;

export default ({ isFavourite, toggle, disabled }: Props) => {
  const label = isFavourite ? "remove from favourites" : "add to favourites";
  const icon = isFavourite ? "🌟" : "🥔";
  const conditionalProps = !disabled ? { onClick: toggle } : null;

  return (
    <Icon role="img" aria-label={label} title={label} {...conditionalProps}>
      {icon}
    </Icon>
  );
};
