/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../../constants/routes';

export default function Logout({ setIsLoggedIn }) {
  const [showWarning, setShowWarning] = React.useState(false);
  const navigate = useNavigate();

  function handleLogoutClick() {
    setShowWarning(true);
    localStorage.setItem('isOnboarded', false);
    console.log(showWarning);
  }
  function handleWarningNoClick() {
    setShowWarning(false);
    console.log(showWarning);
  }
  function handleWarningYesClick() {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    navigate(LOGIN_ROUTE);
  }

  return (
    <div onClick={handleLogoutClick} className="absolute">
      <p className="text-red-500 bg-white" onClick={handleLogoutClick}>Logout</p>
      {showWarning && (
        <div>
          <p>Do you want to logout?</p>
          <p onClick={handleWarningYesClick}>yes</p>
          <p onClick={handleWarningNoClick}>no</p>
        </div>
      )}
    </div>
  );
}
