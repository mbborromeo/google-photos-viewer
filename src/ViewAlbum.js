import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import GooglePhotosService from './GooglePhotosService';

function ViewAlbum( props ) {  
  const albumID = props.match.params.id;

  const service = new GooglePhotosService();

  const [ albumDetails, setAlbumDetails ] = useState( undefined );
  const [ isLoading, setIsLoading ] = useState( true );
  
  //testing
  /*
  service.loadAlbumDetail('1')
  .then(function(result) {
    console.log('loading 1', result);
  });

  service.loadAlbumDetail('doesnt-exist')
  .then(function(result) {
    console.log('loading doesnt-exist', result);
  });
  */

  useEffect( 
    function() {
      const promise = service.loadAlbumDetail(albumID);
      promise.then( function(arg){
        console.log("promise finished", arg);
        setAlbumDetails(arg);
        setIsLoading(false);
      });
    }, 
    [props.match] // Q - what is match used for here?
  );

  /*
  const newAlbum = albumDetails.map( function(obj) {
    return <div key={ obj.id }>
      { obj.id } { obj.description }
    </div>;
  });

  return <div>
    { newAlbum }
    
    {
      isLoading ? "Loading" : "Not loading"
    }

    <hr />
    <Link to="/">Back</Link>    
  </div>;
  */

  /*
  return (
    <div>
      {albumDetails && <h2>{albumDetails.title}</h2>}
      {albumDetails && <p>{albumDetails.description}</p>}
      {isLoading && 'Loading...'}

      <hr />
      <Link to="/">Back to Albums List</Link>
    </div>
  )
  */

  // If the service is finished loading the album, but the album doesnt exist
  if (!isLoading && !albumDetails) { //isLoaded && !albumDetails
    return <div>
      <h2>Album not found</h2>
    </div>
  }

  return <div>
    <h2>Normal display</h2>
    {isLoading ? <div>Loading...</div> : ''}
    {albumDetails !== undefined ? <h2>{albumDetails.title}</h2> : ''}
    {albumDetails !== undefined ? <div>Description: {albumDetails.description}</div> : ''}
  </div>

}

export default ViewAlbum;