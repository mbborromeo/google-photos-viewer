import React from 'react'
import Modal from './Modal';

// props.children renders child nodes within ImageModal 
function ImageModal (props) {
  return (
    <Modal>
      <div className="wrapper" onClick={ (e) => { props.handleClose(e) } } >{/* className={ props.shown ? '' : 'hidden' } */}
        <div className="inner">
          { props.children }
        </div>
      </div>
    </Modal>
  );
}

export default ImageModal