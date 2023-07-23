/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, PROFILE_ROUTE } from '../../constants/routes';
import logo from '../../assets/icons/logoDark.png';

function Navbar() {
  const token = localStorage.getItem('accessToken');
  const myDecodedToken = decodeToken(token);
  const nameOfUser = myDecodedToken.name;
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();

  function handleConfirmLogoutClick() {
    localStorage.removeItem('accessToken');
    localStorage.setItem('isOnboarded', false);
    navigate(LOGIN_ROUTE);
  }

  return (
    <div className="flex items-center bg-McKinseyBlue w-full">
      <button onClick={() => navigate('/landing')}>
        <img src={logo} alt="logo" className="w-12 ml-5" />
      </button>
      <div className="flex-1 text-white text-lg pl-5">
        OneBoard
      </div>
      <div className="flex flex-row text-white p-3 pr-12">
        <FaUserCircle className="w-8 h-8 mr-2" />
        <div className="flex items-center">{nameOfUser}</div>
        {!showDropdown ? <RiArrowDropDownLine className="w-8 h-8 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)} /> : <RiArrowDropUpLine className="w-8 h-8 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)} />}
        {showDropdown && (
          <div className="absolute  mt-2  w-48 bg-McKinseyBlue shadow-xl z-50 top-14" onMouseLeave={() => setShowDropdown(false)}>
            <a href="#" className="block px-4 py-3 text-white hover:bg-dark_gray" onClick={() => navigate(PROFILE_ROUTE)}>Profile</a>
            <a href="#" className="block px-4 py-3 text-white hover:bg-dark_gray" onClick={() => setShowModal(true)}>Logout</a>
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-grey bg-opacity-70 flex items-center justify-center" style={{ zIndex: 1000 }}>
          <div className="bg-white w-96 shadow-lg p-6">
            <h2 className="text-base mb-8">Are you sure you want to logout?</h2>
            <div className="flex justify-end">
              <button className="rounded-3xl py-2 border-2 text-sm text-blue border-blue px-6" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="text-white py-2 px-6 mr-2 rounded-3xl ml-4 text-sm bg-blue " onClick={handleConfirmLogoutClick}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
