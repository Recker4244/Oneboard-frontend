/* eslint-disable import/no-extraneous-dependencies */
import { React, useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
// import Highcharts from 'highcharts';
// import CircularProgress from '@mui/material/CircularProgress';
// import HighchartsReact from 'highcharts-react-official';
// import highchartsMore from 'highcharts/highcharts-more';
import CountUp from 'react-countup';
import makeRequest from '../../utils/makeRequest';
import { GET_PROJECT_COUNT } from '../../constants/apiEndpoints';
import BouncingDotsLoader from '../BouncingDotsLoader';

function ProjectCountDisplayer() {
  const [projectCount, setProjectCount] = useState(null);
  const [totalProjects, setTotalProjects] = useState(null);
  // const [isLoading, setIsLoading] = useState(true); // Add a state variable to track loading

  const token = localStorage.getItem('accessToken');
  const myDecodedToken = decodeToken(token);
  const { username } = myDecodedToken;
  useEffect(() => {
    makeRequest(GET_PROJECT_COUNT(username), {}, { headers: { 'x-auth-token': token } })
      .then((response) => {
        setProjectCount(response.ongoingProjects);
        setTotalProjects(response.totalProjects);
      });
  }, []);
  return projectCount >= 0 && totalProjects > 0
    ? (
      <div className=" bg-white p-1 rounded-3xl">
        <div className="flex flex-col justify-start items-center">
          <p className="text-base text-McKinseyBlue font-bold">Live Projects</p>
          <p className="text-8xl self-center"><CountUp end={projectCount} /></p>
        </div>
        <div className="mt-4 flex">
          <p className=" p-1 pl-2 rounded-lg">
            <span className="text-slate-400 text-base"> Total Projects</span>
            {' '}
            <span className="font-bold text-xl text-McKinseyBlue"><CountUp end={totalProjects} /></span>
          </p>
        </div>
      </div>
    ) : (
      <div>
        {/* <CircularProgress sx={{ color: '#040B81' }} /> */}
        <BouncingDotsLoader />
      </div>
    );
}

export default ProjectCountDisplayer;
