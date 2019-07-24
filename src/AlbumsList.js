import React from 'react';
import { Link } from "react-router-dom";

function AlbumsList() {
  return <div>
    <Link to="/album/1">Album 1</Link>
    <Link to="/album/2">Album 2</Link>
  </div>;

}

export default AlbumsList;