import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div>
      This site was made with React 16.8, Google Photos API, and SASS.
      <br />
      <Link to="/">Back</Link>
    </div>
  );
}

export default About;
