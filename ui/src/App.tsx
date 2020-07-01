import React from "react";
import Search from "./components/search/Search";
import Header from "./components/header/Header";
import styled from "styled-components";

const AppWrapper = styled.div`
  background: #bada55;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  margin: 0 auto;

  @media screen and (min-width: 600px) {
    min-width: 600px;
    width: 60vw;
  }
`;

function App() {
  return (
    <AppWrapper>
      <Header />
      <Content>
        <Search />
      </Content>
    </AppWrapper>
  );
}

export default App;
