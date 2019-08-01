/* global gapi */
import React, { useEffect, useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import AlbumsList from './AlbumsList';
import ViewAlbum from './ViewAlbum';
import About from './About';
import HeaderBar from './HeaderBar';
import { HashRouter as Router, Route } from "react-router-dom";
import PhotoServiceContext from './PhotoServiceContext';
//import DummyGooglePhotosService from './DummyGooglePhotosService';
import GooglePhotosService from './GooglePhotosService';

const SCOPE = 'https://www.googleapis.com/auth/photoslibrary.readonly';

function App() {

  const [initialising, setInitialising] = useState(true);
  const [isAuthorised, setIsAuthorised] = useState(false);
  const [photoService, setPhotoService] = useState(undefined);

  useEffect(
    () => {
      console.log('we\'ve mounted')
      const intervalId = setInterval(
        () => {
          console.log('is google api loaded?')
          if (!window.gapi) {
            console.log('gapi not loaded yet')
            return
          }
          console.log('gapi loaded!!')

          clearInterval(intervalId)
          gapi.load('client:auth2', () => {
            console.log('auth2 is loaded')
            gapi.client.init({
              'apiKey': 'AIzaSyAwgwcEW14nGd6CwqR-7G5cp2ct_c7qI1Q',
              'discoveryDocs': ['https://photoslibrary.googleapis.com/$discovery/rest?version=v1'],
              'clientId': '101744662563-frd5q7291nvegithu7pi3i5dcmlp79ra.apps.googleusercontent.com',
              'scope': SCOPE
            }).then(function () {
              console.log('we\'re initialised')
              setInitialising(false);

              const auth = gapi.auth2.getAuthInstance();
              auth.isSignedIn.listen(() => {
                console.log('signed in status changed')
                setIsAuthorised(user.hasGrantedScopes(SCOPE))
              });

              const user = auth.currentUser.get();
              const startAuth = user.hasGrantedScopes(SCOPE);
              console.log('has photos library permission?', startAuth);
              setPhotoService(new GooglePhotosService(gapi.client));
              setIsAuthorised(startAuth);
              
              // gapi.client.photoslibrary.albums.list({})
              //   .then(function(response) {
              //     // Handle the results here (response.result has the parsed body).
              //     console.log("Album Response", response);
              //   });
            })
          });
        },
        100
      )
    },
    []
  )

  const onSignOut = useCallback(
    () => {
      gapi.auth2.getAuthInstance().signOut();
    },
    []
  )

  const onSignIn = useCallback(
    () => {
      gapi.auth2.getAuthInstance().signIn();
    },
    []
  )

  if (initialising) {
    return <div>Initing...</div>
  }

  if (!isAuthorised) {
    return <button onClick={onSignIn}>Sign in</button>
  }


  return (
    <div className="App">
      <PhotoServiceContext.Provider value={photoService}>
        <Router>
          <HeaderBar />

          <button onClick={ onSignOut }>Sign Out</button>

          <div>
            <Route path="/" exact component={AlbumsList} />
            <Route path="/album/:id" component={ViewAlbum} />
            <Route path="/about" component={About} />
          </div>
        </Router>
      </PhotoServiceContext.Provider>
    </div>
  );  
}

export default App;
