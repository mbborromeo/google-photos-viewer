import React, { useState, useEffect, useContext } from 'react'
import './AlbumsList.scss'
import { Link } from 'react-router-dom'
import PhotoServiceContext from './PhotoServiceContext'
import HeaderBar from './HeaderBar'

function AlbumsList () {
  const service = useContext(PhotoServiceContext) // new GooglePhotosService();
  const [albums, setAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // useEffect only runs once to get the promise data initially.
  useEffect(function () {
    const promise = service.loadAlbums()
    promise.then(function (arg) {
      setAlbums(arg)
      setIsLoading(false)
    })
  },
  []
  )

  const newAlbums = albums.map( function (obj){
    return (
      <li key={obj.id}>
        <Link to={'/album/' + obj.id}>
          <figure>
            <img src={obj.coverPhotoBaseUrl} />            
            <figcaption>
              <h3>
                { obj.title }
              </h3>
            </figcaption>
          </figure>
        </Link>
        <br />
      </li>
    );
  })

  return (
    <div>
      { isLoading && 'Loading...' }
      <div>
        <HeaderBar />
        
        <ul className="albums">
          { newAlbums }
        </ul>
      </div>
    </div>
  );
}

export default AlbumsList
