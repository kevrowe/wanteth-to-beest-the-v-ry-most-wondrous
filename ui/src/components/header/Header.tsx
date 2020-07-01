import React from "react";
import styled from "styled-components";
import { H1 } from "../../styles/Typography";

const Header = styled.header`
  padding: 10px;
  background: white;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export default () => (
  <Header>
    <H1>
      <span role="img" aria-label="Sheep emoji">
        🐑
      </span>
      &nbsp;PokeSearch&nbsp;
      <span role="img" aria-label="Eyes emoji">
        👀
      </span>
    </H1>
  </Header>
);
