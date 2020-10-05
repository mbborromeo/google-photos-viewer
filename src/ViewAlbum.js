import React, { useState, useEffect, useContext } from 'react'
import './ViewAlbum.scss'
import { Link } from 'react-router-dom'
// import DummyGooglePhotosService from './DummyGooglePhotosService';
import PhotoServiceContext from './PhotoServiceContext'
import HeaderBar from './HeaderBar'

function ViewAlbum (props) {
  const albumID = props.match.params.aid

  // const service = new DummyGooglePhotosService();
  const service = useContext(PhotoServiceContext)

  const [albumDetails, setAlbumDetails] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(
    function () {
      const promise = service.loadAlbumDetail(albumID)
      promise.then(function (arg) {
        setAlbumDetails(arg)
        setIsLoading(false)
      })
    },
    [props.match] // keep watching this for changes
  )

  // If the service is finished loading the album, but the album doesnt exist
  if (!isLoading && !albumDetails) { // isLoaded && !albumDetails
    return (
      <div>
        <h2>Album not found</h2>
      </div>
    );
  }

  return (
    <div>
      { isLoading && 'Loading...' }
      { albumDetails &&
        <div>
          { console.log('ViewAlbum albumDetails', albumDetails) }
          <HeaderBar albumDetails={ albumDetails } />
          
          <ul>
            { albumDetails.mediaItems.map( function (mediaItem){
              return (
                <li key={mediaItem.id}>
                  <Link to={'/photo/' + mediaItem.id + '/' + albumID + '/' + albumDetails.title }>
                    <figure>
                      <img src={mediaItem.baseUrl} alt='' />
                    </figure>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      }

      <hr />
      <Link to='/'>Back to Albums List</Link>
    </div>
  );
}

export default ViewAlbum
