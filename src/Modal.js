import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

// Source: https://www.thomasmaximini.com/building-fullscreen-overlays-with-react-16-portals
// use the same div here that I mount my app into
// so the modal will be a sibling of the rest of the app
// in the DOM hierachy
const modalRoot = document.getElementById('root');

function Modal(props) {
  // constructor
  const el = document.createElement('div');
  el.setAttribute('id', 'modal');

  // Similar to componentDidMount and componentDidUpdate
  useEffect(function () {
    modalRoot.appendChild(el);

    // Equivalent to componentWillUnmount
    // Specify how to clean up after this effect:
    return function cleanup() {
      modalRoot.removeChild(el);
    };
  });

  return ReactDOM.createPortal(props.children, el);
}

export default Modal;
