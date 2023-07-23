/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import Components from '../../components/index';
import LandingPageOverview from '../../components/LandingPageOverview';
import LeadershipLandingPageSummary from '../../components/LeadershipLandingPageSummary';
import ManagerLandingPageSummary from '../../components/ManagerLandingPageSummary';
import DeveloperLandingPageSummary from '../../components/DeveloperLandingPageSummary';
import Navbar from '../../components/Navbar';

function LandingPageSummary(role) {
  if (role === 'leadership') {
    return <LeadershipLandingPageSummary />;
  }
  if (role === 'manager') {
    return <ManagerLandingPageSummary />;
  }
  if (role === 'developer') {
    return <DeveloperLandingPageSummary />;
  }
}

function LandingPage() {
  const decodedToken = decodeToken(localStorage.getItem('accessToken'));
  const [isOnboarded, setIsOnboarded] = React.useState(false);
  useEffect(() => {
    if (localStorage.getItem('isOnboarded') === 'true') {
      setIsOnboarded(true);
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar nameOfUser={decodedToken.name} />
      {
        LandingPageSummary(decodedToken.role)
      }
      <Components.OnboardingDialog
        isOpen={!isOnboarded}
        setIsOpen={setIsOnboarded}
        role={decodedToken.role}
      />
      <LandingPageOverview />
    </div>
  );
}

export default LandingPage;
