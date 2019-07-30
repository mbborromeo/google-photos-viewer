import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import GooglePhotosService from './GooglePhotosService';

const service = new GooglePhotosService();

function AlbumsList() {
  const [ albums, setAlbums ] = useState( [] );
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect( function(){
      console.log("promise inside");
      const promise = service.loadAlbums();
      promise.then( function(arg){
        console.log("promise finished", arg);
        setAlbums(arg);
        setIsLoading(false);
      });
    }, 
    [] 
  );

  console.log('isLoading', isLoading);
  console.log('albums', albums);

  const newAlbums = albums.map( function(obj) {
    //console.log('obj', obj);
    return <div key={ obj.id }>
      <Link to={ "/album/" + obj.id }>{ obj.title }</Link><br />
    </div>;
  });


  console.log('newAlbums', newAlbums);

  return <div>
    { newAlbums }
    {
      isLoading ? "Loading" : "Not loading"
    }
  </div>;

}

export default AlbumsList;