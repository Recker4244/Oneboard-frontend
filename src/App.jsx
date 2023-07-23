import React from 'react';
/* eslint-disable no-unused-vars */
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import {
  ERROR_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  ADMIN_ROUTE,
  PROJECT_DETAILS_PAGE_ROUTE,
  LANDING_ROUTE,
  RETRO_ROUTE,
  PROFILE_ROUTE,
  PULSE_ROUTE
} from './constants/routes';
import Pages from './pages/index';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    } else { navigate(LOGIN_ROUTE); }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path={ADMIN_ROUTE} element={<Pages.AdminDashboard />} />
        <Route
          path={HOME_ROUTE}
          element={<Pages.LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path={LOGIN_ROUTE}
          element={<Pages.LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        {isLoggedIn && (
          <Route
            path={LANDING_ROUTE}
            element={(
              <Pages.LandingPage />
            )}
          />
        )}
        {isLoggedIn && (
          <Route
            path={`${PROJECT_DETAILS_PAGE_ROUTE}/:id`}
            element={(
              <Pages.ProjectDetailPage setIsLoggedIn={setIsLoggedIn} />
            )}
          />
        )}
        {isLoggedIn && (
          <Route
            path={PULSE_ROUTE}
            element={(
              <Pages.PulsePage />
            )}
          />
        )}
        {isLoggedIn && (
          <Route
            path={PROFILE_ROUTE}
            element={(
              <Pages.ProfilePage />
            )}
          />
          // <Route path={PROFILE_ROUTE} element={<Pages.ProfilePage />} />
        )}
        {isLoggedIn && (
          <Route
            path={PROFILE_ROUTE}
            element={(
              <Pages.ProfilePage />
            )}
          />
          // <Route path={PROFILE_ROUTE} element={<Pages.ProfilePage />} />
        )}
        <Route path={`${ERROR_ROUTE}/:errorCode?`} element={<Pages.ErrorPage />} />
        {/* <Route path={RETRO_ROUTE} element={<Pages.RetroBoard />} /> */}
        <Route path="*" element={<Pages.NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
