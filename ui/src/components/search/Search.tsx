import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  query: string;
  onSubmit: (query: string) => void;
}

const Search = styled.input`
  padding: 10px;
  font-size: 3rem;
  width: 100%;
  background: #eee;
  border: 1px solid #bada55;
  border-bottom: 3px solid #bada55;
  margin-bottom: 30px;
`;

export default ({ query, onSubmit }: Props) => {
  const [val, setVal] = useState(query);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        onSubmit(val);
      }}
    >
      <Search
        onChange={(e) => setVal(e.target.value)}
        type="text"
        placeholder="🔎 Search..."
        name="search"
        value={val}
      />
    </form>
  );
};
