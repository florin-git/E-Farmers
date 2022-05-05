import React from 'react';
import { Link } from 'react-router-dom';


function NotFound(props) {
  return (
    <div className='container mt-5'>
      <h2>404</h2>
      <p>Page not found</p>
      <Link to='/'>Back home</Link>
    </div>
  );
}

export default NotFound;