import React , { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import PhotoServiceContext from './PhotoServiceContext';

function ViewPhoto(props) {
  console.log('props', props);

  console.log('props.match', props.match);

  console.log('props.match.params', props.match.params);
  
  const photoID = props.match.params.id;
  const service = useContext(PhotoServiceContext);

  const [ photoDetails, setPhotoDetails ] = useState( undefined );
  const [ isLoading, setIsLoading ] = useState( true );

  useEffect( 
    function() {
      console.log('photoID', photoID);
      const promise = service.loadPhotoDetail(photoID);
      promise.then( function(arg){
        console.log("promise finished", arg);
        setPhotoDetails(arg);
        setIsLoading(false);
      });
    }, 
    [props.match] // keep watching this for changes
  );

  if (!isLoading && !photoDetails) {
    return <div>
      <h2>Photo not found</h2>
    </div>
  }

  return <div>
    {isLoading && 'Loading...'}
    {photoDetails &&
      <div>
        <img src={photoDetails.baseUrl} />
      </div>
    }

    <hr />
    <Link to="/">Back to Albums List</Link>
  </div>
}

export default ViewPhoto;