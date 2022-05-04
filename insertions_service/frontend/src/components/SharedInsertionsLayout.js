import React from 'react';
import { Outlet } from 'react-router-dom';

function SharedInsertionsLayout(props) {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default SharedInsertionsLayout;