import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (

    <div className="App">
      <header className="App-header">
        <p>THE WORLD IS A LONELY PLACE AND THE ONLY HOPE OF FINDING ONESELF IS THROUGH THE SACRAMENT KNOWN AS VIDEO GAMES.</p>
      </header>
      <Router>
      <>
        <Navbar />
        <Home></Home>
      </>
    </Router>
    </div>
  );
}

export default App;
