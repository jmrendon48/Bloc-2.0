import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from 'react-router-dom';
import { QUERY_REVIEWGAME } from "../utils/queries";
import GameInfo from "../components/GameInfo/index"
import { Container, Card } from "react-bootstrap";
import ReviewList from "../components/ReviewList/index";


const GamePage = () => {
  const { gameId: gameParam } = useParams();
  
  const { loading, data } = useQuery(QUERY_REVIEWGAME, {
    variables: { gameId: gameParam },
  });


  if (loading) {
    return <div>Loading...</div>;
  }
  const reviews = data?.reviewGame || {};

  return (
    
    <div>
      <GameInfo gameId={gameParam}></GameInfo>
      <>
        <Container className="col-8">
          <Card border="dark">

            
            <Card.Body></Card.Body>

          </Card>
        </Container>
        {loading ? <div>Loading...</div> : <ReviewList reviews={reviews} />}
      </>
    </div>
  );

};

export default GamePage;
