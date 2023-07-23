/* eslint-disable react/prop-types */
import React from 'react';
import Logout from './Logout';

export default function Dropdown({ setIsLoggedIn }) {
  return (
    <div>
      <Logout setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}
