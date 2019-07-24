import React from 'react';
import logo from './logo.svg';
import './App.scss';
import AlbumsList from './AlbumsList';
import ViewAlbum from './ViewAlbum';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function App() {
  return (
    <div className="App">    
      <Router>
        <div>
          <Route path="/" exact component={AlbumsList} />
          <Route path="/album/:id" component={ViewAlbum} />
        </div>
      </Router>
    </div>
  );  
}




export default App;
