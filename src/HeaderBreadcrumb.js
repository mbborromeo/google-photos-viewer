import React from 'react'
import './HeaderBreadcrumb.scss'
import { Link } from 'react-router-dom'

function HeaderBreadcrumb (props) {
  return (
    <div className="header">
        <h2>
          { (props.albumDetails && props.albumDetails.title) || props.photoDetails ? 
            <Link to='/'>Albums</Link>
            : "Albums"
          }
          { props.albumDetails && props.albumDetails.title &&
            <span>
               &nbsp;&raquo;&nbsp;
               { props.albumDetails.title }
            </span>
          }
          {
            props.photoDetails && props.albumID && props.albumTitle && 
            <span>
               &nbsp;&raquo;&nbsp;
               <Link to={ `/album/${ props.albumID }` }>
                 { props.albumTitle }
               </Link>
            </span>
          }
          {
            props.photoDetails && 
            <span>
               &nbsp;&raquo; { (props.photoDetails.filename).split(".")[0] }
            </span>
          }          
        </h2>
    </div>
  );
}

export default HeaderBreadcrumb
