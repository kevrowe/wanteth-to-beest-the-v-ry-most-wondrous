import React, { useState, useEffect } from "react";
import Search from "./components/search/Search";
import Header from "./components/header/Header";
import styled from "styled-components";
import SearchResult from "./components/search/SearchResult";
import { search as searchRequest, Pokemon } from "./api/search";
import Favourites from "./components/favourites/Favourites";
import Loading from "./components/loading/Loading";

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

const Card = styled.div`
  background: white;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-top: 30px;

  @media screen and (min-width: 600px) {
    margin-top: 100px;
    padding: 30px;
  }
`;

function App() {
  const [favourites, setFavourites] = useState(new Set<string>());
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState({} as Pokemon);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) return;
    setLoading(true);

    searchRequest(searchQuery.toLocaleLowerCase())
      .then((result) => {
        setSearchResult(result);
        setLoading(false);
      })
      .catch((e) => {
        setSearchResult({
          id: -1,
          name: "Error",
          description: "Something went wrong, try again later",
        });
        setLoading(false);
      });
  }, [searchQuery]);

  const toggleFavourite = (pokemon: string) =>
    setFavourites(
      (() => {
        if (favourites.has(pokemon)) {
          favourites.delete(pokemon);
          return new Set(favourites);
        } else {
          return new Set(favourites.add(pokemon));
        }
      })()
    );

  return (
    <AppWrapper>
      <Header />
      <Content>
        <Card>
          <Favourites favourites={favourites} onClick={setSearchQuery} />
          <Search query={searchQuery} onSubmit={setSearchQuery} />
          {searchResult.id && !loading && (
            <SearchResult
              result={searchResult}
              isFavourite={favourites.has(searchQuery.toLowerCase())}
              toggleFavourite={toggleFavourite}
            />
          )}
          {loading && <Loading />}
        </Card>
      </Content>
    </AppWrapper>
  );
}

export default App;
