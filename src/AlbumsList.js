import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import PhotoServiceContext from './PhotoServiceContext'

function AlbumsList () {
  const service = useContext(PhotoServiceContext) // new GooglePhotosService();
  const [albums, setAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // useEffect only runs once to get the promise data initially.
  useEffect(function () {
    const promise = service.loadAlbums()
    promise.then(function (arg) {
      // console.log("promise finished", arg);
      setAlbums(arg)
      setIsLoading(false)
    })
  },
  []
  )

  const newAlbums = albums.map(function (obj) {
    return <div key={obj.id}>
      <Link to={'/album/' + obj.id}>{ obj.title }<img src={obj.coverPhotoBaseUrl} /></Link><br />
    </div>
  })

  return <div>
    { newAlbums }
    {
      isLoading ? 'Loading' : 'Not loading'
    }
  </div>
}

export default AlbumsList
