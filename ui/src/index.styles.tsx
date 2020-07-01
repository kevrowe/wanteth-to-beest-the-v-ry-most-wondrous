import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html, body {
    margin: 0;
    padding: 0;
    font-size: 10px;
    font-family: Arial, Helvetica, sans-serif;
  }
  body {
    font-size: 1.6rem;
  }
`;
