/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { decodeToken } from 'react-jwt';
import BouncingDotsLoader from '../BouncingDotsLoader';

import makeRequest from '../../utils/makeRequest';
import { GET_STORY_COUNT, GET_WORKLOAD_BAROMETER } from '../../constants/apiEndpoints';

function VelocitySpeedometer() {
  const [options, setOptions] = useState();
  // const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [velo, setVelo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const myDecodedToken = decodeToken(token);
    makeRequest(GET_WORKLOAD_BAROMETER(myDecodedToken.username), {}, { headers: { 'x-auth-token': token } }).then((res) => {
      const velocity = res;
      console.log('velocity', velocity);
      setVelo(velocity);
      setOptions({
        chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false,
          // height: '145px',
          // width: '240',
          // height: `${(70 / 100) * 100}%`,
          marginTop: -80,
          marginBottom: -10,
          marginLeft: -60,
          marginRight: -60,
          borderRadius: 40
        },

        title: {
          text: null
        },

        pane: {
          startAngle: -90,
          endAngle: 89.9,
          background: null,
          center: ['50%', '75%'],
          size: '70%'
        },

        // the value axis
        yAxis: {
          min: 0,
          max: 40,
          tickPixelInterval: 72,
          tickPosition: 'inside',
          tickColor: '#FFFFFF',
          tickLength: 20,
          tickWidth: 2,
          minorTickInterval: null,
          labels: {
            // distance: 20,
            style: {
              fontSize: '14px'
            }
          },
          plotBands: [{
            from: 0,
            to: 20,
            color: {
              linearGradient: {
                x1: 0, x2: 0, y1: 0, y2: 1
              },
              stops: [
                [0, '#DDDF0D'], // yellow
                [1, '#55BF3B'] // green
              ]
            }
          }, {
            from: 20,
            to: 40,
            color: {
              linearGradient: {
                x1: 0, x2: 0, y1: 0, y2: 1
              },
              stops: [
                [0, '#DDDF0D'], // yellow
                [1, '#DF5353'] // red
              ]
            }
          }]
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'Velocity',
          data: [Number(velocity)],
          tooltip: {
          },
          dataLabels: {
            format: '{y}',
            borderWidth: 0,
            color: '#333333',
            style: {
              fontSize: '16px'
            }
          },
          dial: {
            radius: '80%',
            backgroundColor: '#051C2C',
            baseWidth: 12,
            baseLength: '0%',
            rearLength: '0%'
          },
          pivot: {
            backgroundColor: '#051C2C',
            radius: 6
          }
        }]
      });
      // const updateDimensions = () => {
      // setContainerDimensions({
      //   // width: (90 / 100) * (document.getElementById('container').clientWidth),
      //   // height: (60 / 100) * (document.getElementById('container').clientHeight)
      // });
      // };
      // window.addEventListener('resize', updateDimensions);
      // updateDimensions();
      // return () => window.removeEventListener('resize', updateDimensions);
    });
  }, []);

  return velo !== null ? (
    <div id="container" className="flex flex-col velocity-speedometer-container h-full w-full justify-center items-center">
      <div className="flex flex-row justify-center mb-3">
        {' '}
        <p className="translate-y-1 text-base font-bold">Workload Barometer</p>
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{
          style: {
            height: '75%', width: '100%', borderRadius: '15px'
          }
        }}
      />
    </div>
  ) : (
    <div>
      {/* <CircularProgress sx={{ color: '#040B81' }} /> */}
      <BouncingDotsLoader />
    </div>
  );
}

export default VelocitySpeedometer;

