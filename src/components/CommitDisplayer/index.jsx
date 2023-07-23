/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import { decodeToken } from 'react-jwt';
import { useParams } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import BouncingDotsLoader from '../BouncingDotsLoader';
import { GET_COMMITS_DEV } from '../../constants/apiEndpoints';
import './CommitDisplayer.css';

highchartsMore(Highcharts);

function CommitDisplayer() {
  const decodedToken = decodeToken(localStorage.getItem('accessToken'));
  const [commits, setCommits] = useState(null);
  const { id } = useParams();

  const [options, setOptions] = useState({
    colors: ['#0d233a', '#1aadce'],
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
      },
      line: {
        enableMouseTracking: true
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
    makeRequest(GET_COMMITS_DEV(decodedToken.username, id), {}, {
      headers: {
        'x-auth-token': localStorage.getItem('accessToken')
      }
    })
      .then((res) => {
        if (res?.userCommits !== undefined && res?.totalCommits !== undefined) {
          setCommits(res);
          setOptions({
            ...options,
            series: [
              {
                name: 'Your Commits',
                data: [res.userCommits]
              },
              {
                name: "Other's Commits",
                data: [res.totalCommits - res.userCommits]
              }
            ]
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    commits
      ? (
    // <div className="m-3 w-48">
    //   <div className="mt-4 text-xs left-5 top-1 flex justify-end">
    //     <p className="border-2 border-gray-400 rounded-md px-1">
    //       <span className="font-bold"><CountUp end={commits.totalCommits} /></span>
    //       {' '}
    //       Team Commit Count
    //     </p>
    //   </div>
    //   <div className="flex flex-col justify-start">
    //     <p className="text-4xl font-bold"><CountUp end={commits.userCommits} /></p>
    //     <p className="text-sm text-gray-400">Commit Count</p>
    //   </div>

        // </div>
        <div className="h-44 px-6 bg-white rounded-3xl flex flex-col justify-between align-center w-1/5">
          <div className="translate-y-7 translate-x-3 font-bold text-base">Commit Stats</div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-col justify-center">
              <div className="flex flex-row">
                <div className="h-3 w-3 rounded-full mx-1 justify-center items-center" style={{ backgroundColor: '#0d233a' }} />
                <p className="text-xs">Your Commits</p>
              </div>
              <div className="flex flex-row">
                <div className="h-3 w-3 rounded-full mx-1 justify-center items-center" style={{ backgroundColor: '#1aadce' }} />
                <p className="text-xs">Other's Commits</p>
              </div>
            </div>
            <div className="flex flex-col relative justify-center">
              <div className="staffed-count-displayer -translate-y-3 mr-1 bg-transparent flex justify-center">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={options}
                />
              </div>
              <div className="text-2xl justify-center self-center absolute top-23 left-18">
                {((commits.userCommits / commits.totalCommits) * 100).toFixed(1)}
                %
              </div>
            </div>
          </div>
        </div>
      )
      : (
        <div className="flex justify-center items-center" data-testid="loader">
          <BouncingDotsLoader />
        </div>
      )
  );
}

export default CommitDisplayer;
