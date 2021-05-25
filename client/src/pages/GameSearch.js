import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Container, Col, Form, Button, Card } from "react-bootstrap";
import { searchGame } from "../utils/API";
import env from "react-dotenv";
const client = env.twitch_client_id
const auth = env.twitch_auth

const GameSearch = () => {
  const [games, setGames] = useState([]);
  const [url, setUrl] = useState([])
  const [searchInput, setSearchInput] = useState("");
  const coverUrlArr = ['test'];
  const testArrw = ['1', '1', '2', '3', 'https://images.igdb.com/igdb/image/upload/t_1080p/co1rco.jpg']
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
      //map data from first api search
      const gameData = items.map((game, index) => ({
        id: game.id,
        name: game.name,
        cover: game.cover,
        coverUrl: null,
        first_release_date: game.first_release_date,
        summary: game.summary,
      }));
      // console.log("------handleForm------", items, items[0].cover, items.length);
      for (let i = 0; i < items.length; i++) {
        // getGameCover(items[i].cover)
        const dataSearch = `fields *; where id = ${items[i].cover};`;
        const responce = await fetch(`https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/covers`, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            "Client-ID": client,
            "Authorization": auth,
          },
          body: dataSearch
          //to use this must grab image_id from data object then input it into `https://images.igdb.com/igdb/image/upload/t_1080p/${image_id}.jpg` to get image
        }).then(function (data1) {
          return data1.json()
        }).then(response => {
          // console.log("4-----------------", response)
          const hash = response[0].image_id;
          const link = `https://images.igdb.com/igdb/image/upload/t_1080p/${hash}.jpg`
          // console.log("grom API ------------", link)
          coverUrlArr.push(`${link}`)
          // console.log(coverUrlArr, "in nested fetch !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
          gameData[i].coverUrl= `${link}`
          return link
        }).catch(err => {
          console.error(err);
        })
      }
      
      // console.log("check ------------------", coverUrlArr[0], items )
      // console.log(gameData.coverUrl);

      setGames(gameData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const doFunction = (event) => {
    handleFormSubmit(event);
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for a Game</h1>
          <Form onSubmit={doFunction}>
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
                className="text-light"
              >
                <Card key={game.id} border="dark">
                  {game.cover ? (
                    <Card.Img
                      src={game.coverUrl}
                      alt={`The cover for ${game.name}, url: ${game.coverUrl}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Title>{game.name}</Card.Title>
                </Card>
              </Link>
            );
          })}
        </Card>
      </Container>
    </>
  );
};
//remember the picture api (james will do it)
//when clicking on picture link to game page
export default GameSearch;
