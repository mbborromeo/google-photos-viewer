import React from 'react'
import './HeaderBar.scss'
import { Link } from 'react-router-dom'

function HeaderBar () {
  return (
    <div>
      <Link to='/'>Albums List</Link><br />
      <Link to='/about'>About</Link>
    </div>
  );
}

export default HeaderBar
