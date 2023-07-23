/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useParams } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import BouncingDotsLoader from '../BouncingDotsLoader';
import { GET_TEAM_DISTRIBUTION } from '../../constants/apiEndpoints';

function TeamDistribution() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem('accessToken');
  useEffect(() => {
    const tempArray = [];
    let index = 1;
    makeRequest(GET_TEAM_DISTRIBUTION(id), {}, { headers: { 'x-auth-token': token } }).then((res) => {
      for (const [key, value] of (Object.entries(res))) {
        tempArray.push({ sprint: `S${index++}`, teams: value });
      }
      setData(tempArray);
    });
  }, [id]);

  const options = {
    title: {
      text: ''
    },
    xAxis: {
      title: {
        text: 'Sprint',
        style: {
          fontWeight: 'bold',
          fontSize: '16px',
          color: 'black'
        }
      },
      lineColor: 'black',
      lineWidth: 3,
      tickWidth: 2,
      tickColor: 'black',
      tickmarkPlacement: 'on',
      categories: data.map((d) => d.sprint)
    },
    yAxis: {
      title: {
        text: 'Team Count',
        style: {
          fontWeight: 'bold',
          fontSize: '16px',
          color: 'black'
        }
      },
      lineColor: 'black',
      lineWidth: 3,
      tickWidth: 2,
      tickColor: 'black',
      gridLineColor: 'transparent',
      tickInterval: 1
    },
    series: [{
      name: '',
      data: data.map((d) => d.teams),
      marker: {
        enabled: false
      },
      color: '#B2B6F1',
      showInLegend: false,
      enableMouseTracking: false,
      animation: false
    }],
    credits: false
  };

  return data.length > 0 ? (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  ) : (
    <div className="flex justify-center items-center mt-24">
      <BouncingDotsLoader />
    </div>
  );
}

export default TeamDistribution;
