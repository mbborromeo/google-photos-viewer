import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import PhotoServiceContext from './PhotoServiceContext'
import HeaderBreadcrumb from './HeaderBreadcrumb'

function ViewPhoto (props) {
  const photoID = props.match.params.pid
  const albumID = props.match.params.aid
  const albumTitle = props.match.params.atitle

  const service = useContext(PhotoServiceContext)

  const [photoDetails, setPhotoDetails] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(
    function () {
      const promise = service.loadPhotoDetail(photoID)
      promise.then(function (arg) {
        setPhotoDetails(arg)
        setIsLoading(false)
      })
    },
    [props.match] // keep watching this for changes
  )

  if (!isLoading && !photoDetails) {
    return (
      <div>
        <h2>Photo not found</h2>
      </div>
    );
  }

  return (
    <div>
      { isLoading && 'Loading...' }
      { photoDetails &&
        <div>
          <HeaderBreadcrumb photoDetails={ photoDetails } albumID={ albumID } albumTitle={ albumTitle } />          

          <div>
            <img src={photoDetails.baseUrl} />
          </div>
        </div>
      }

      <hr />
      <Link to='/'>Back to Albums List</Link>
    </div>
  );
}

export default ViewPhoto
