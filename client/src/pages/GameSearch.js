import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Container, Col, Form, Button, Card } from "react-bootstrap";
import { searchGame } from "../utils/API";

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

      const gameData = items.map((game) => ({
        id: game.id,
        name: game.name,
        cover: game.cover,
        first_release_date: game.release,
        summary: game.summary,
      }));

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
                    src={game.cover}
                    alt={`The cover for ${game.name}`}
                    variant="top"
                  />
                ) : null}
                <Card.Title>
                  <Link
                    to={'/gamepage/'}
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
