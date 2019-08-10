import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import PhotoServiceContext from './PhotoServiceContext'

function ViewPhoto (props) {
  const photoID = props.match.params.id
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
    <Link to='/'>Back to Albums List</Link>
  </div>
}

export default ViewPhoto
