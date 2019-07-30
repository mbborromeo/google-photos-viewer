import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import GooglePhotosService from './GooglePhotosService';

function ViewAlbum( props ) {  
  const albumID = props.match.params.id;

  const service = new GooglePhotosService();

  const [ albumDetails, setAlbumDetails ] = useState( [] ); //undefined
  const [ isLoading, setIsLoading ] = useState( true );

  useEffect( 
    function() {
      const promise = service.loadAlbumDetail(albumID);
      promise.then( function(arg){
        console.log("promise finished", arg);
        setAlbumDetails(arg);
        setIsLoading(false);
      });
    }, 
    []
  );

  const newAlbum = albumDetails.map( function(obj) {
    return <div key={ obj.id }>
      { obj.id } { obj.description }
    </div>;
  });

  return <div>
    { newAlbum }

    <br />
    <Link to="/">Back</Link>

    {
      isLoading ? "Loading" : "Not loading"
    }
  </div>;
}

export default ViewAlbum;