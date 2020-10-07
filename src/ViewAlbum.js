import React, { useState, useEffect, useContext } from 'react'
import './ViewAlbum.scss'
import { Link } from 'react-router-dom'
// import DummyGooglePhotosService from './DummyGooglePhotosService';
import PhotoServiceContext from './PhotoServiceContext'
import HeaderBreadcrumb from './HeaderBreadcrumb'
import ViewPhoto from './ViewPhoto'
import ImageModal from './ImageModal'

function ViewAlbum (props) {
  console.log('ViewAlbum props', props)
  const albumID = props.match.params.aid

  // const service = new DummyGooglePhotosService();
  const service = useContext(PhotoServiceContext)

  const [albumDetails, setAlbumDetails] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [shown, setShown] = useState(false)
  const [selectedPhotoID, setSelectedPhotoID] = useState(undefined)
  const [selectedPhotoNumber, setSelectedPhotoNumber] = useState(undefined)

  const handleClick = (e, pid=undefined, pnumber=undefined) => {
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
      <ImageModal handleClose={ handleClick } shown={ shown }>
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
      const promise = service.loadAlbumDetail(albumID)
      promise.then(function (arg) {
        setAlbumDetails(arg)
        setIsLoading(false)
      })
    },
    [props.match, service, albumID] // keep watching this for changes
  )

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
            { albumDetails.mediaItems.map( function (mediaItem, itemIndex){
              return (
                <li key={mediaItem.id}>
                  <a href="#" onClick={ (e) => {handleClick(e, mediaItem.id, itemIndex)} } >{/* onClick={ (e) => {renderModal(mediaItem.id, itemIndex, e)} } */}
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
