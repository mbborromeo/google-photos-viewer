import React from 'react'
import Modal from './Modal';
import './ImageModal.scss'

// refer to #root or .App in DOM as parent container
//const container = document.querySelector(".App");
// overlay lightbox background onto container
// insert ViewPhoto component into lightbox
// display photo number/total
// include previous/next buttons
function ImageModal (props) {
  return (
    <Modal>
      <div className="wrapper">{/* className={ props.shown ? '' : 'hidden' } */}
        <div className="inner">
          <a 
            href="#" onClick={ (e) => { props.handleClose(e) } }
            className="close"
          >
            X
          </a>          
          { props.children }
        </div>
      </div>
    </Modal>
  );
}

export default ImageModal