import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import './components/FontAwesome';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import gamePage from './pages/GamePage';

function App() {
  const client = new ApolloClient({
    uri: '/graphql'
  });

  return (

    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <>
            <Navbar />
            <Switch>
<<<<<<< HEAD
              <Route exact path='/' component={Home}></Route>
=======
              <Route exact path='/Home' component={Home}></Route>
              <Route exact path='/Search' component={gamePage}></Route>
>>>>>>> feature/gamePage
              <Route exact path='/Profile' component={Profile}></Route>
            </Switch>
          </>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
