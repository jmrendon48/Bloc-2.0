  
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Container, Form, Button, Card, Col, CardColumns } from 'react-bootstrap';
import { GAME_SAVED } from "../utils/mutations"
import { useMutation } from "@apollo/client";

const GameSearch = () => {
  const [games, setGames] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [addGame] = useMutation(GAME_SAVED)
  const [name, setName] = useState("");
  const [gameId, setGameId] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [summary, setSummary] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }
    try {
      // const response = await searchGame(searchInput);
      const response = await fetch(`/test/${searchInput}`)

      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const items = await response.json();
      //map data from first api search
      const gameData = items.map((game, index) => ({
        id: game.id,
        name: game.name,
        cover: game.cover,
        coverUrl: null,
        first_release_date: game.first_release_date,
        summary: game.summary,
      }));

      for (let i = 0; i < items.length; i++) {
        const response = await fetch(`/rest/${items[i].cover}`)
          .then(function (data) { return data.json() })
          .then(response => {
            const hash = response[0].image_id;
            const link = `https://images.igdb.com/igdb/image/upload/t_1080p/${hash}.jpg`
            gameData[i].coverUrl = `${link}`
            setName(gameData[i].name);
            setGameId(gameData[i].gameId);
            setCoverUrl(gameData[i].coverUrl);
            setSummary(gameData[i].summary);
            // addGame({
            //   variables: { name, gameId, coverUrl, summary }
            // })
            return link
          })
          .catch(err => {
            console.error(err);
          })
      }
      setGames(gameData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="jumbotron jumbotron-fluid">
        <Container>
          <h1 class="display-4 banner" >Search for a Game</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Enter Title Here"
                />
              </Col>
              <Button type="submit" variant="success" size="lg">
                Search
              </Button>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container className="">
        <h2 className="pageText">
          {games.length
            ? `Viewing ${games.length} results:`
            : "Write a Bloc on your favorite titles by searching them up!"}
        </h2>

        <CardColumns>
          <div>
            {games.map((game) => {
              return (
                <Card style={{border: '15px solid white', width: "18rem" }}>
                  <Link
                    to={{
                      pathname: `/gamepage/${game.name}`,
                      state: {
                        name: `${game.name}`,
                        gameId: `${game.id}`,
                        coverUrl: `${game.coverUrl}`,
                        summary: `${game.summary}`,
                        first_release_date: `${game.first_release_date}`,
                      },
                    }}
                    style={{ fontWeight: 700 }}
                    className="text-dark"
                  >
                    <div key={game.id}>
                      {game.cover ? (
                        <Card.Img
                          src={game.coverUrl}
                          alt={`The cover for ${game.name}, url: ${game.coverUrl}`}
                          variant="top"
                        />
                      ) : null}
                      <Card.Title>{game.name}</Card.Title>
                    </div>
                  </Link>
                </Card>
              );
            })}
          </div>
        </CardColumns>
      </Container>
    </>
  );
};
//remember the picture api (james will do it)
//when clicking on picture link to game page
export default GameSearch;