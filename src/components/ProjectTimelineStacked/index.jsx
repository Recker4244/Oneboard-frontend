/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useEffect, useState } from 'react';
// import { LoaderDots } from '@thumbtack/thumbprint-react';
import Highcharts from 'highcharts';
// import CircularProgress from '@mui/material/CircularProgress';
import HighchartsReact from 'highcharts-react-official';
import makeRequest from '../../utils/makeRequest';
import BouncingDotsLoader from '../BouncingDotsLoader/index';
import { GET_PROJECT_TIMELINE } from '../../constants/apiEndpoints';
import './ProjectTimelineStacked.css';

// eslint-disable-next-line no-unused-vars
function ProjectTimelineStacked({ projectId, color }) {
  const token = localStorage.getItem('accessToken');
  const [projectTimeline, setProjectTimeline] = useState();
  const [options, setOptions] = useState({
    chart: {
      height: 100,
      width: 300,
      type: 'bar',
      marginTop: -50,
      marginBotton: -50
    },
    colors: ['#088F8F', '#FAC711', '#8FD04F'],
    title: {
      text: null
    },
    xAxis: {
      lineColor: 'transparent',
      labels: {
        enabled: false
      }
    },
    yAxis: {
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
      series: {
        stacking: 'percent',
        pointWidth: 30,
        dataLabels: {
          enabled: false
        }
      }
    },
    tooltip: {
      headerFormat: null
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    series: null
  });

  useEffect(() => {
    makeRequest(GET_PROJECT_TIMELINE(projectId), {}, { headers: { 'x-auth-token': token } })
      .then((response) => {
        const temp = Object.keys(response.issues);
        const newIssues = [];
        temp.forEach((key) => {
          newIssues.push({
            name: key,
            data: response.issues[key].length
          });
        });
        response.issues = newIssues;
        // console.log(response);
        setProjectTimeline(response);
        // const colors = color === null ?
        // ['#088F8F', '#FAC711', '#8FD04F'] : ['#737373', '#BEBEBE', '#D9D9D9'];
        setOptions({
          chart: {
            height: 100,
            width: 300,
            type: 'bar',
            marginTop: -50,
            marginBotton: -50,
            backgroundColor: color // set the background color here
          },
          // colors,
          title: {
            text: null
          },
          xAxis: {
            lineColor: 'transparent',
            labels: {
              enabled: false
            }
          },
          yAxis: {
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
            series: {
              stacking: 'percent',
              pointWidth: 30,
              dataLabels: {
                enabled: false
              }
            }
          },
          tooltip: {
            headerFormat: null
          },
          credits: {
            enabled: false
          },
          legend: {
            enabled: false
          },
          series: [
            {
              name: 'Done',
              data: [response.issues.find((issue) => issue.name === '✅ Done').data ?? 0],
              color: color === null ? '#8FD04F' : '#737373'
            },
            {
              name: 'In Progress',
              data: [response.issues.find((issue) => issue.name === '👀 In review').data ?? 0],
              color: color === null ? '#FAC711' : '#BEBEBE'
            },
            {
              name: 'To Do',
              data: [response.issues.find((issue) => issue.name === 'To-Do')?.data ?? 0],
              color: color === null ? '#088F8F' : '#D9D9D9'
            }
          ]
        });
      });
  }, []);

  const handleDaysLeft = (startingDate, length) => {
    const startDate = new Date(startingDate);
    const duration = length * 24 * 60 * 60 * 1000; // 14 days
    const endDate = new Date(startDate.getTime() + duration);
    const today = new Date();
    const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));

    return daysLeft;
  };

  return projectTimeline ? (
    <div className="flex flex-col relative project-timeline-highchart-container">
      <div className="text-xl">
        {projectTimeline.currentSprint}
        {' '}
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
      {projectTimeline && projectTimeline?.startDate
        && (
          <div className="text-md">
            {handleDaysLeft(projectTimeline.startDate, projectTimeline.duration)}
            {' '}
            {handleDaysLeft(projectTimeline.startDate, projectTimeline.duration) > 1 ? 'days left' : 'day left'}
          </div>
        )}
    </div>
  ) : (
    <div>
      <BouncingDotsLoader />
    </div>
  );
}

export default ProjectTimelineStacked;
