import React from 'react';
import { Link } from "react-router-dom";

function ViewAlbum( props ) {  
  const albumID = props.match.params.id;

  return <div>
    Album number { albumID }
    <br />
    <Link to="/">Back</Link>
  </div>;
}

export default ViewAlbum;