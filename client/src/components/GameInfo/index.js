import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_GAME } from "../../utils/queries";

function GameInfo(){
    const {loading, data} = useQuery(QUERY_GAME, {
    variables: {gameId: "545"}
    })
    
    if (loading) {
      return <div>Loading...</div>;
    }
    console.log("data!!!!!!!!!!!!!!!!!",data);
    const reviews = data?.reviewGame || {};
  
 

  return(
    <h1>test</h1>
  );

}

export default GameInfo;