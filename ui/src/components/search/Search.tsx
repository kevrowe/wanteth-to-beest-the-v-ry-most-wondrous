import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background: white;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-top: 30px;

  @media screen and (min-width: 600px) {
    margin-top: 100px;
    padding: 30px;
  }
`;

const Search = styled.input`
  padding: 10px;
  font-size: 3rem;
  width: 100%;
  background: #eee;
  border: 1px solid #bada55;
  border-bottom: 3px solid #bada55;
  margin-bottom: 30px;
`;

export default () => (
  <Wrapper>
    <Search type="text" placeholder="🔎 Search..." name="search" />
    <article>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, dicta
      ipsum necessitatibus ducimus repellat, maiores quo voluptates distinctio
      illum natus fugiat ut corrupti nisi nemo rem qui magnam nihil nobis.
    </article>
  </Wrapper>
);
