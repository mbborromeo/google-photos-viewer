import React from 'react'
import { Link } from 'react-router-dom'

function HeaderBreadcrumb (props) {
  return (
    <div className="header">
      <h2>
        { props.albumDetails && props.albumDetails.title ? 
          <Link to='/'>Albums</Link>
          : "Albums"
        }
        { props.albumDetails && props.albumDetails.title &&
            <span>
               &nbsp;&raquo;&nbsp;
              { props.albumDetails.title }
            </span>
        }
      </h2>
    </div>
  );
}

export default HeaderBreadcrumb
