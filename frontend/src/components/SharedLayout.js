import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function SharedLayout(props) {
  return (
    <div>
      <Navbar />
      <Outlet />
      {/* Footer */}
    </div>
  );
}

export default SharedLayout;