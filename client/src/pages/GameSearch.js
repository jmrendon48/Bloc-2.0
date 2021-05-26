  
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Container, Form, Button, Card, Col, CardColumns } from 'react-bootstrap';
import { GAME_SAVED } from "../utils/mutations"
import { useMutation, useQuery} from "@apollo/client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {QUERY_GAMES} from "../utils/queries"
const GameSearch = () => {
  const [games, setGames] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [count, setCount] = useState(0)
  let repeat = false;
  let didRepeat = false;
  let gameList = [];
  const [addGame] = useMutation(GAME_SAVED)
  const { loading, data } = useQuery(QUERY_GAMES)
  function checkRepeat(gameId) {
    for (let i = 0; i < data.games.length; i++) {
      console.log(gameList[i].gameId, "================", gameId)
      if (gameList[i].gameId === gameId) {
        repeat=true
        didRepeat=true
        console.log('repeated!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      } else {
        repeat=(false)
        console.log(' no repeated!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      }
    }
}

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (count === 0) {
      if(!loading) {
        setCount(count + 1)
        console.log('count=============================', count)
        gameList = data.games.map(a => Object.assign({}, a))
        console.log("here", gameList, gameList[0].gameId)
      }
    }

    if (!searchInput) {
      return false;
    }
    try {

      const response = await fetch(`/test/${searchInput}`)

      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const items = await response.json();

      const gameData = items.map((game) => ({
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
            checkRepeat(`${gameData[i].id}`)
            if (!repeat) {
              if (didRepeat){
                console.log("already added")
              } else {
                addGame({
                  variables: { name: gameData[i].name, gameId: `${gameData[i].id}`, coverUrl: gameData[i].coverUrl, summary: gameData[i].summary }
                });
              }
            }
            return link
          })
          .catch(err => {
            console.error(err);
          })
      }
      setGames(gameData);
      repeat = false
      didRepeat=false
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const doFunction = (event => {
    handleFormSubmit(event)
  })

  return (
    <>
      <Jumbotron fluid className="jumbotron jumbotron-fluid">
        <Container>
          <h1 class="display-4 banner" >Search for a Game</h1>
          <Form onSubmit={doFunction}>
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
                <FontAwesomeIcon
                icon='search'
                />
              </Button>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container className="">
        <h3 className="pageText">
          {games.length
            ? `Viewing ${games.length} results:`
            : "Search for Blocs on your favorite titles"}
        </h3>

        <CardColumns>
          <div>
            {games.map((game) => {
              return (
                <Card style={{border: '15px solid white', width: "18rem" }}>
                  <Link
                    to={{
                      pathname: `/gamepage/${game.id}`,
                      state: {
                        name: `${game.name}`,
                        gameId: `${game.id}`,
                        coverUrl: `${game.coverUrl}`,
                        summary: `${game.summary}`,
                        // first_release_date: `${game.first_release_date}`,
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

export default GameSearch;