/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import CircularProgress from '@mui/material/CircularProgress';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import makeRequest from '../../utils/makeRequest';
import { GET_STAFF_COUNT } from '../../constants/apiEndpoints';
import BouncingDotsLoader from '../BouncingDotsLoader';

highchartsMore(Highcharts);

function StaffedPeopleCountDisplayer() {
  const [staffCount, setStaffCount] = useState(null);
  const [totalStrength, setTotalStrength] = useState(null);
  // const [isLoading, setIsLoading] = useState(true); // Add a state variable to track loading
  const token = localStorage.getItem('accessToken');
  const [options, setOptions] = useState({
    colors: ['#F24627', '#8FD04F'],
    chart: {
      height: 150,
      width: 170,
      type: 'column',
      inverted: true,
      polar: true,
      marginBottom: 0,
      marginTop: 20
    },
    title: {
      text: null
    },
    tooltip: {
      outside: true,
      headerFormat: null
    },
    pane: {
      size: '85%',
      innerSize: '20%',
      endAngle: 360
    },
    xAxis: {
      tickInterval: 1,
      lineColor: 'transparent',
      gridLineColor: 'transparent',
      labels: {
        enabled: false
      },
      lineWidth: 0
    },
    yAxis: {
      crosshair: {
        enabled: true,
        color: '#333'
      },
      lineWidth: 0,
      tickInterval: 25,
      reversedStacks: false,
      endOnTick: true,
      showLastLabel: true,
      lineColor: 'transparent',
      gridLineColor: 'transparent',
      labels: {
        enabled: false
      },
      title: {
        text: null
      }
    },
    plotOptions: {
      column: {
        stacking: 'percent',
        pointWidth: 23,
        borderWidth: 0,
        pointPadding: 0,
        groupPadding: 0.15
      }
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    series: []
  });
  useEffect(() => {
    makeRequest(GET_STAFF_COUNT, {}, { headers: { 'x-auth-token': token } })
      .then((response) => {
        setStaffCount(response.currentlyActiveUsers);
        setTotalStrength(response.totalUsers);
        setOptions({
          ...options,
          series: [{
            name: 'On Beach',
            data: [response.totalUsers - response.currentlyActiveUsers]
          }, {
            name: 'On Project',
            data: [response.currentlyActiveUsers]
          }]

        });
      });
  }, []);

  return staffCount > 0 && totalStrength > 0 ? (
    <div className="mx-3 bg-white px-1 rounded-3xl flex flex-col justify-center align-center">
      {/* <div className="mt-4 text-xs flex justify-end">
        <p className="border-2 border-slate-400  p-1 pl-2 rounded-lg">
          <span className="font-bold text-xl">{totalStrength}</span>
          {' '}
          <span className="text-slate-400 text-base">
            Total Strength
          </span>
        </p>
      </div>
      <div className="flex flex-col justify-start">
        <p className="text-5xl font-bold">{staffCount}</p>
        <p className="text-base text-slate-400">Number of People Staffed</p>
      </div> */}

      <div className="flex flex-col relative justify-center h-48">
        <p className="text-base text-black self-center translate-y-3 z-10 mx-2 font-bold">Staff Utilization</p>

        <div className="staffed-count-displayer -translate-y-3 m-1 bg-transparent flex justify-center">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
        </div>
        <div className="text-2xl justify-center self-center absolute top-23 left-18">
          {(100 * (staffCount / totalStrength)).toFixed(1)}
          %
        </div>
        <div className="flex flex-row -translate-y-4 justify-center">
          <div className="h-3 w-3 rounded-full mx-1 justify-center items-center" style={{ backgroundColor: '#8FD04F' }} />
          <p className="text-xs self-center ">On Project</p>
          <div className="h-3 w-3 rounded-full mx-1 justify-center items-center ml-1" style={{ backgroundColor: '#F24627' }} />
          <p className="text-xs self-center ">On Beach</p>
        </div>
      </div>

    </div>
  ) : (
    <div>
      {/* <CircularProgress sx={{ color: '#040B81' }} /> */}
      <BouncingDotsLoader />
    </div>
  );
}

export default StaffedPeopleCountDisplayer;
