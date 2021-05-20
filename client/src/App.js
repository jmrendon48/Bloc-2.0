import React from 'react';
import './components/FontAwesome';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';


function App() {

  return (

    <div className="App">

      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/Home' component={Home}></Route>
            <Route exact path='/Profile' component={Profile}></Route>
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
