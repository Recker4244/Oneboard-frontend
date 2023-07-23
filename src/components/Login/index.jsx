/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-alert */
import React from 'react';
import { Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { decodeToken } from 'react-jwt';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import makeRequest from '../../utils/makeRequest';
import { AUTHENTICATE_USER } from '../../constants/apiEndpoints';
import { ERROR_ROUTE } from '../../constants/routes';
import logo from '../../assets/icons/logoLight.png';

export default function Login({ setIsLoggedIn }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const notify = () => toast.error('Invalid Id or Password', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

  const handleEyeIconClick = () => {
    setShowPassword(!showPassword);
  };

  const setPasswordType = () => ((showPassword) ? 'text' : 'password');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    if (password === '' || username === '') return null;

    event.preventDefault();
    try {
      const res = await makeRequest(
        AUTHENTICATE_USER,
        { data: { username, password } },
        navigate
      );
      // console.log(res);
      const decodedToken = decodeToken(res.accessToken);
      localStorage.setItem('accessToken', res.accessToken);
      setIsLoggedIn(true);

      if (decodedToken.role === 'admin') { navigate('/admin'); } else {
        navigate('/landing', { state: { role: decodeToken.role } });
      }
    } catch (e) {
      if (e.response?.status === 400) {
        notify();
      } else if (e.response?.status) {
        navigate(`${ERROR_ROUTE}/${e.response.status}`);
      } else {
        navigate(ERROR_ROUTE);
      }
      return null;
    }
    return true;
  };

  return (

    <div className="w-1/2 flex justify-center">
      <div className="flex flex-col flex-1 items-center justify-center bg-form-bg">
        <img src={logo} alt="logo" height={10} width={150} className="mb-8" />
        <div className="flex">
          <p className="font-bold text-McKinseyElectric text-3xl items-center mb-8">Welcome</p>
          {/* <img className="ml-2" src={loginIcon} height="20" width="20" alt="loginIcon" /> */}
        </div>
        <form onSubmit={handleSubmit} className="w-3/5 flex flex-col items-center rounded-lg">
          <label className="w-full flex flex-col items-center">
            <Input placeholder="Username" className="w-full bg-transparent mb-8" data-testid="usernameInput" type="text" value={username} onChange={handleUsernameChange} />
          </label>
          <label className="w-full flex flex-col items-center relative">
            <Input placeholder="Password" className="h-8 w-full bg-transparent" data-testid="passwordInput" type={setPasswordType()} value={password} onChange={handlePasswordChange} />
            {
              (showPassword) ? <AiFillEyeInvisible onClick={handleEyeIconClick} className="m-2 self-end -translate-y-8" /> : <AiFillEye onClick={handleEyeIconClick} className="m-2 self-end -translate-y-8" />
            }
          </label>
          {
            (username === '' || password === '')
              ? <input className="mt-12 rounded-full border-2 text-md text-McKinseyElectric border-McKinseyElectric w-56 h-10 cursor-pointer" data-testid="submitButton" type="submit" value="Login" />
              : <input className="mt-12 rounded-full border-2 text-md bg-McKinseyElectric border-McKinseyElectric text-white w-56 h-10 cursor-pointer" data-testid="submitButton" type="submit" value="Login" />
          }
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </form>
      </div>
    </div>
  );
}
