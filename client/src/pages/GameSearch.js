import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Container, Col, Form, Button, Card } from "react-bootstrap";
import { searchGame, getGameCover } from "../utils/API";

const makeUrl = (coverId) => {
    try {
      const response = getGameCover(coverId);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const items = response.json();
      console.log("--------------------hello------------------",items);
      const imageId = items[0].imageId
      const setUrl = `https://images.igdb.com/igdb/image/upload/t_1080p/${imageId}.jpg`
      return setUrl

    } catch (err) {
      console.error(err);
    }
}

const SearchBooks = () => {
  const [games, setGames] = useState([]);
  
  const [searchInput, setSearchInput] = useState("");
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGame(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const items = await response.json();

      console.log(items);

      const gameData = items.map((game) => (
        {
          id: game.id,
          name: game.name,
          cover: game.cover,
          first_release_date: game.first_release_date,
          summary: game.summary,
        }));
        for(let i=0;  i<gameData.length; i++) {
          gameData[i].coverUrl=makeUrl(gameData[i].cover)
        }
      setGames(gameData);
      setSearchInput("");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for a Game</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a Game"
                />
              </Col>

              <Button type="submit" variant="success" size="lg">
                Submit Search
              </Button>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container className="col-3">
        <h2>
          {games.length
            ? `Viewing ${games.length} results:`
            : "Search for a book to begin"}
        </h2>
        <Card style={{ width: "18rem" }}>
          {games.map((game) => {
            return (
              <Card key={game.id} border="dark">
                {game.cover ? (
                  <Card.Img
                    src={game.coverUrl}
                    alt={`The cover for ${game.name}`}
                    variant="top"
                  />
                ) : null}
                <Card.Title>
                  <Link
                    to={{
                      pathname: `/gamepage/${game.name}`,
                      state: {
                        name: `${game.name}`,
                        coverId: `${game.cover}`,
                        summary: `${game.summary}`,
                        first_release_date: `${game.first_release_date}`,
                      },
                    }}
                    style={{ fontWeight: 700 }}
                    className="text-light"
                  >
                    {game.name}
                  </Link>
                </Card.Title>
              </Card>
            );
          })}
        </Card>
      </Container>
    </>
  );
};
//remember the picture api (james will do it)
//when clicking on picture link to game page
export default SearchBooks;
