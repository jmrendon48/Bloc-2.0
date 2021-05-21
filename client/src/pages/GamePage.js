// import  React, { useState} from "react";
// import { searchGame } from "../utils/API"

// const gamePage = () => {
// 	const [games, setGames] = useState([]);
// 	const [searchValue, setSearchValue] = useState("");

//     const handleFormSubmit = async (event) => {
//         event.preventDefault();

//         if(!searchValue) {return false}
    
//         try {
//           const response = await searchGame(searchValue);
    
//           if (!response.ok) {
//             throw new Error('something went wrong!');
//           }
//           const { data } = await response.json;

//           const gameData = data.map((game) =>{
//               console.log(game)
//           })

          
//           setSearchValue('')
//           console.log(response)
          
//         } catch (err) {
//           console.error(err);
//         }
//       };

// 	return (
// 		<div className='container-fluid'>
//             <form id="searchValue">
//             <input value={searchValue} onchange={setSearchValue} placeholder='Type to search...'></input>
//             <button type= "submit" onSubmit={handleFormSubmit}>Submit</button>
// 			</form>
// 		</div>
// 	);
// };

// export default gamePage;
import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { searchGame } from "../utils/API"



const SearchBooks = () => {
  // create state for holding returned google api data
  const [ games, setGames] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved bookId values


  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup


  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGame(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      console.log(response);

      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

 

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for a Game</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a Game'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>
    </>
  );
};

export default SearchBooks;