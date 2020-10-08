import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
// import DummyGooglePhotosService from './DummyGooglePhotosService';
import PhotoServiceContext from './PhotoServiceContext'
import HeaderBreadcrumb from './HeaderBreadcrumb'
import ViewPhoto from './ViewPhoto'
import ImageModal from './ImageModal'

function ViewAlbum (props) {
  // console.log('ViewAlbum props', props)
  const albumID = props.match.params.aid

  // const service = new DummyGooglePhotosService();
  const service = useContext(PhotoServiceContext)

  const [albumDetails, setAlbumDetails] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [shown, setShown] = useState(false)
  const [selectedPhotoID, setSelectedPhotoID] = useState(undefined)
  const [selectedPhotoNumber, setSelectedPhotoNumber] = useState(undefined)
  const [currentPageToken, setCurrentPageToken] = useState(undefined)
  const [previousPageToken, setPreviousPageToken] = useState(undefined)

  const handleClickShowOrHide = (e, pid=undefined, pnumber=undefined) => {
    e.preventDefault(); // cancel default behaviour of opening a link
    const targetClassName = e.target.className; // .tagName.toLowerCase()

    if( shown ){
      if( targetClassName==="inner" || targetClassName==="wrapper" ){
        setShown( false )
      }
    } else {
      setSelectedPhotoID( pid )
      setSelectedPhotoNumber( parseInt(pnumber) + 1 )
      setShown( true )
    }
  };

  /* Modal resource: https://www.thomasmaximini.com/building-fullscreen-overlays-with-react-16-portals */
  const renderModal = () => {
    return (
      <ImageModal handleClose={ handleClickShowOrHide } shown={ shown }>
        <ViewPhoto 
          photoID={ selectedPhotoID } 
          photoNumber={ selectedPhotoNumber } 
          photosTotal={ albumDetails.mediaItemsCount } 
        />
      </ImageModal>
    );
  }

  useEffect(
    function () {
      // TO DO: add case for when nextPageToken has a value...
      const promise = service.loadAlbumDetail(albumID, currentPageToken)
      promise.then(function (arg) {
        setAlbumDetails(arg)
        setIsLoading(false)
      })
    },
    [props.match, service, albumID, currentPageToken] // keep watching this for changes
  )

  const handleClickNext = (e) => {
    e.preventDefault();
    console.log('handleClickNext albumDetails.nextPageToken', albumDetails.result.nextPageToken)
    setPreviousPageToken( currentPageToken )
    setCurrentPageToken( albumDetails.result.nextPageToken )
  }

  const handleClickPrevious = (e, prevState) => {
    e.preventDefault();
    console.log('handleClickPrevious previousPageToken', previousPageToken)
    setCurrentPageToken( previousPageToken )
    setPreviousPageToken( prevState.previousPageToken )
  }

  return (
    <div>
      { isLoading && 
        <span>
          'Loading...'
        </span>
      }
      { !isLoading && albumDetails &&
        <div>
          <HeaderBreadcrumb albumDetails={ albumDetails } />
          
          <ul>
            { albumDetails.result.mediaItems.map( function (mediaItem, itemIndex){
              return (
                <li key={mediaItem.id}>
                  <a href="#" onClick={ (e) => {handleClickShowOrHide(e, mediaItem.id, itemIndex)} } >
                    <figure>
                      <img src={mediaItem.baseUrl} alt='' />
                    </figure>                  
                  </a>
                </li>
              );
            })}
          </ul>

          { shown &&
            renderModal() 
          }
          
          { currentPageToken &&
            <span>
              <a href="#" onClick={ (e) => { handleClickPrevious(e) } }>Previous page</a> | 
            </span>
          }

          { albumDetails.result.nextPageToken &&
            <span>
              &nbsp;<a href="#" onClick={ (e) => { handleClickNext(e) } }>Next page</a>
            </span>
          }
        </div>
      }
      { !isLoading && !albumDetails &&
        <span>Album not found</span>
      }      

      <hr />
      <Link to='/'>Back to Albums List</Link>
    </div>
  );
}

export default ViewAlbum
