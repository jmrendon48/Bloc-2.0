import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Container, Col, Form, Button, Card } from "react-bootstrap";
import { searchGame } from "../utils/API";
import { GAME_SAVED } from "../utils/mutations"
import { QUERY_GAME } from "../utils/queries"
import {  useMutation } from "@apollo/client";
// import env from "react-dotenv";
// const client = env.twitch_client_id
// const auth = env.twitch_auth

const GameSearch = () => {
  const [games, setGames] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [addGame] = useMutation(GAME_SAVED)
  const [formState, setFormState] = useState({ name: '', gameId: '', coverUrl:'', summary:'' })
  // const [name,setName] =useState("");
  // const [gameId,setGameId] =useState("");
  // const [coverUrl,setCoverUrl] =useState("");
  // const [summary,setSummary] =useState("");
  // function reset(){
  //     setName("");
  //     setGameId("");
  //     setCoverUrl("");
  //     setSummary("");
  //   }
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

      for (let i = 0; i < items.length; i++) {
        const dataSearch = `fields *; where id = ${items[i].cover};`;
        const responce = await fetch(`https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/covers`, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            // "Client-ID": client,
            // "Authorization": auth,
            "Client-ID": 'w6k0p7kqfipr0j3xuj55q2z85vrs57',
            "Authorization": 'Bearer 1cv3ma8y8rj7im3gm6sb8izgzsycox',
          },
          body: dataSearch

        }).then(function (data1) {
          return data1.json()
        }).then(response => {
          const hash = response[0].image_id;
          const link = `https://images.igdb.com/igdb/image/upload/t_1080p/${hash}.jpg`
          gameData[i].coverUrl = `${link}`
          // setName(gameData[i].name);
          // setGameId(gameData[i].id);
          // setCoverUrl(gameData[i].coverUrl);
          // setSummary(gameData[i].summary);
          setFormState({
            name:gameData[i].name,
            id:gameData[i].id,
            coverUrl:gameData[i].coverUrl,
            summary:gameData[i].summary,
          })
          // addGame({
          //   variables: { name, gameId, coverUrl, summary }
          // })
          
          return link
         
        }).catch(err => {
          console.error(err);
        })
      }


      setGames(gameData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };
  const doFunction =  (event =>{
    handleFormSubmit(event)
    doMutation(event)
  })
  function doMutation(event){
  try{
        const mutations =  addGame({ variables: { name: formState.name, gameId: formState.gameId, coverUrl: formState.coverUrl, summary:formState.summary }})
    } catch (e){
      console.error(e)
    }
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
            : "No Results"}
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
