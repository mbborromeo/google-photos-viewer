import React, { useState, useEffect, useContext } from 'react';
import PhotoServiceContext from './PhotoServiceContext';

function ViewPhoto(props) {
  const photoID = props.photoID; //props.match.params.pid
  const photoNumber = props.photoNumber;
  const photosTotal = props.photosTotal;
  console.log('ViewPhoto -', photoID, photoNumber, photosTotal);

  const service = useContext(PhotoServiceContext);
  const [photoDetails, setPhotoDetails] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      const promise = service.loadPhotoDetail(photoID);
      promise.then(function (arg) {
        setPhotoDetails(arg);
        setIsLoading(false);
      });
    },
    [props.match, service, photoID] // keep watching this for changes
  );

  return (
    <div>
      {isLoading && (
        <figure>
          <figcaption>'Loading...'</figcaption>
        </figure>
      )}
      {!isLoading && photoDetails && (
        <figure>
          <img src={photoDetails.baseUrl} alt="" />
          <figcaption>
            {photoNumber} of {photosTotal}
          </figcaption>
        </figure>
      )}
      {!isLoading && !photoDetails && (
        <figure>
          <figcaption>Photo not found</figcaption>
        </figure>
      )}
    </div>
  );
}

export default ViewPhoto;
