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
<<<<<<< HEAD
              <Route exact path='/search' component={gamePage}></Route>
              <Route exact path='/profile/:username?' component={Profile}></Route>
=======
              <Route exact path='/Search' component={gameSearch}></Route>
              <Route exact path='/Profile' component={Profile}></Route>
>>>>>>> 04713f232cdfaab2b47b9b8e8dc233af23be63c1
            </Switch>
          </>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
