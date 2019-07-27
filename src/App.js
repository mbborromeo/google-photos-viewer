import React from 'react';
import logo from './logo.svg';
import './App.scss';
import AlbumsList from './AlbumsList';
import ViewAlbum from './ViewAlbum';
import About from './About';
import HeaderBar from './HeaderBar';
import { HashRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderBar />

        <div>
          <Route path="/" exact component={AlbumsList} />
          <Route path="/album/:id" component={ViewAlbum} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    </div>
  );  
}

export default App;
