/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import HighchartsReact from 'highcharts-react-official';
// import CircularProgress from '@mui/material/CircularProgress';
import Highcharts from 'highcharts';
import propTypes from 'prop-types';
import { decodeToken } from 'react-jwt';
import BouncingDotsLoader from '../BouncingDotsLoader/index';
import makeRequest from '../../utils/makeRequest';
import { PULSE_API } from '../../constants/apiEndpoints';

function BarGraph({
  title, y, x
}) {
  const [data, setData] = React.useState({});
  // const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const myDecodedToken = decodeToken(token);
    makeRequest(PULSE_API(myDecodedToken.username), {}, { headers: { 'x-auth-token': token } })
      .then((res) => {
        setData(res);
      }).then(() => console.log('data', data)).catch((err) => {
        console.log(err);
      });
  }, []);
  const options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent'
    },
    title: {
      text: title,
      style: {
        fontSize: '15px',
        fontWeight: 'bold'
      },
      x: -90,
      y: 15
    },
    xAxis: {
      categories: data.x_axis,
      title: {
        text: x
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: y
      }
    },
    colors: ['#F24627', '#FAC711', '#8FD04F'],
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
      shared: true,
      borderRadius: 20
    },
    plotOptions: {
      column: {
        stacking: 'constants'
      }
    },
    // position of legend
    legend: {
      align: 'right',
      itemStyle: {
        fontSize: '10px'
      },
      itemDistance: 5,
      itemMarginTop: 0,
      width: 170,
      verticalAlign: 'top',
      floating: true,
      backgroundColor: 'transparent'
    },
    series: data.y_axis,
    credits: {
      enabled: false
    }
  };
  return Object.keys(data).length > 0
    ? (
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{
          style: {
            height: '100%', width: '100%', borderRadius: '15px'
          }
        }}
      />
    )
    : (
      <div>
        {/* <CircularProgress sx={{ color: '#040B81' }} /> */}
        <BouncingDotsLoader />
      </div>
    );
}

BarGraph.propTypes = {
  title: propTypes.string.isRequired,
  y: propTypes.string.isRequired,
  x: propTypes.string.isRequired
  // colors: propTypes.array.isRequired
};

export default BarGraph;
