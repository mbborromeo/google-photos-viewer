/* global gapi */
import React, { useEffect, useCallback, useState } from 'react'
import './App.scss'
import AlbumsList from './AlbumsList'
import ViewAlbum from './ViewAlbum'
import ViewPhoto from './ViewPhoto'
import About from './About'
import { HashRouter as Router, Route } from 'react-router-dom'
import PhotoServiceContext from './PhotoServiceContext'
// import DummyGooglePhotosService from './DummyGooglePhotosService';
import GooglePhotosService from './GooglePhotosService'

const SCOPE = 'https://www.googleapis.com/auth/photoslibrary.readonly'

function App (props) {
  const [initialising, setInitialising] = useState(true)
  const [isAuthorised, setIsAuthorised] = useState(false)
  const [photoService, setPhotoService] = useState(undefined)

  useEffect(
    () => {
      console.log('we\'ve mounted')
      
      const intervalId = setInterval(
        () => {
          if (!window.gapi) {
            return
          }

          clearInterval(intervalId)
          gapi.load('client:auth2', () => {
            gapi.client.init({
              discoveryDocs: ['https://photoslibrary.googleapis.com/$discovery/rest?version=v1'],
              clientId: props.gapiID,
              scope: SCOPE
            }).then(function () {
              setInitialising(false)

              const auth = gapi.auth2.getAuthInstance()
              auth.isSignedIn.listen(() => {
                setIsAuthorised(user.hasGrantedScopes(SCOPE))
              })

              const user = auth.currentUser.get()
              const startAuth = user.hasGrantedScopes(SCOPE)
              setPhotoService(new GooglePhotosService(gapi.client))
              setIsAuthorised(startAuth)

              // gapi.client.photoslibrary.albums.list({})
              //   .then(function(response) {
              //     // Handle the results here (response.result has the parsed body).
              //     console.log("Album Response", response);
              //   });
            })
          })
        },
        100
      )
    },
    []
  )

  const onSignOut = useCallback(
    () => {
      gapi.auth2.getAuthInstance().signOut()
    },
    []
  )

  const onSignIn = useCallback(
    () => {
      gapi.auth2.getAuthInstance().signIn()
    },
    []
  )

  if (initialising) {
    return <div>Initialising...</div>
  }

  if (!isAuthorised) {
    return <button onClick={onSignIn}>Sign in</button>
  }

  return (
    <div className='App'>
      <PhotoServiceContext.Provider value={photoService}>
        <Router>
          <button onClick={onSignOut}>Sign Out</button>

          <div>
            <Route path='/' exact component={AlbumsList} />
            <Route path='/album/:aid' component={ViewAlbum} />
            <Route path='/about' component={About} />
            <Route path='/photo/:pid/:aid/:atitle' component={ViewPhoto} />
          </div>
        </Router>
      </PhotoServiceContext.Provider>
    </div>
  )
}

export default App
