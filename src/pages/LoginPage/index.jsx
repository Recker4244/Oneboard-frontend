/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Lottie from 'lottie-react';
import Login from '../../components/Login';
import login7 from '../../assets/lottie/login7.json';
import login8 from '../../assets/lottie/login8.json';
import login9 from '../../assets/lottie/login9.json';

export default function LoginPage({ setIsLoggedIn }) {
  return (
    <div className="bg-form-bg h-screen flex relative">
      <div className="bg-light_blue w-1/2 flex justify-center items-center">
        <Carousel
          autoPlay
          infiniteLoop
          interval={5000}
          showThumbs={false}
          showArrows={false}
          showStatus={false}
          className="flex flex-col justify-between items-center w-full h-full bg-McKinseyBlue"
        >
          <div style={{ marginTop: '100px' }}>
            <Lottie animationData={login7} />
            <h3 className="text-McKinseyCyan text-3xl mt-4">Actionable Analytics</h3>
            <p className="text-white mt-2">Insightful metrics at your fingertips</p>
          </div>
          <div style={{ marginBottom: '75px' }}>
            <Lottie animationData={login8} />
            <h3 className="text-McKinseyCyan text-3xl">Empowering Collaboration</h3>
            <p className="text-white mt-1">Your all-in-one solution for project management and collaboration</p>
          </div>
          <div style={{ marginTop: '40px', height: '100vh' }}>
            <Lottie className="h-2/3" animationData={login9} />
            <h3 className="text-McKinseyCyan text-3xl">Actionable Analytics</h3>
            <p className="text-white mt-2">Insightful metrics at your fingertips</p>
          </div>
        </Carousel>
      </div>
      <Login setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}
