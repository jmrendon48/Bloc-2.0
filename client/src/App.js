import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import './components/FontAwesome';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import gameSearch from './pages/GameSearch';
import GamePage from './pages/GamePage';
import GameSearch from './pages/GameSearch';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <>
            <Navbar/>
            <Switch>
              <Route exact path='/' component={Home}></Route>
              <Route exact path='/search' component={gameSearch}></Route>
              <Route exact path='/gamepage/:gameId?' component={GamePage}></Route>
              <Route exact path='/search' component={GameSearch}></Route>
              <Route exact path='/profile/:username?' component={Profile}></Route>
            </Switch>
          </>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
