import React from "react";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  font-size: 2rem;
`;

export default () => (
  <LoadingWrapper>
    <span role="img" aria-label="hourglass">
      ⏳
    </span>
    <span> Loading</span>
  </LoadingWrapper>
);
