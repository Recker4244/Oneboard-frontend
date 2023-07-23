import { React, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';
import { decodeToken } from 'react-jwt';
import BouncingDotsLoader from '../BouncingDotsLoader/index';
import makeRequest from '../../utils/makeRequest';
import { GET_STORY_COUNT } from '../../constants/apiEndpoints';
// import './StoryStatsDisplayer.css';

function ProjectTimelineStacked({ color }) {
  const [options, setOptions] = useState({
    chart: {
      height: '40px',
      width: 250,
      type: 'bar',
      backgroundColor: color
    },
    colors: ['#2f7ed8', '#3FB950'], // original colors
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
        borderRadius: 9,
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

  const [totalStoriesAssigned, setTotalStoriesAssigned] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [totalStoriesCompleted, setTotalStoriesCompleted] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const myDecodedToken = decodeToken(token);
    makeRequest(GET_STORY_COUNT(myDecodedToken.username), {}, { headers: { 'x-auth-token': token } }).then((response) => {
      const newOptions = {
        chart: {
          height: '40px',
          width: 250,
          type: 'bar'
          // backgroundColor: '#F1F1F1'
        },
        colors: color ? ['#555555', '#777777'] : ['#2f7ed8', '#3FB950'], // use grayscale colors if 'color' is not null
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
            borderRadius: 9,
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
        series: [{
          name: 'In Progress',
          data: [Number(response.storiesAssignedCount) - Number(response.storiesCompletedCount)]
        }, {
          name: 'Done',
          data: [Number(response.storiesCompletedCount)]
        }]
      };
      setOptions(newOptions);
      setTotalStoriesAssigned(response.storiesAssignedCount);
      setTotalStoriesCompleted(response.storiesCompletedCount);
    });
  }, [color]);

  return totalStoriesCompleted != null ? (
    <div className="flex flex-col relative project-timeline-highchart-container translate-y-2">
      <HighchartsReact
        className=""
        highcharts={Highcharts}
        options={options}
      />

      <div className="text-md">
        <p>
          Total Stories Assigned:
          {' '}
          {Number(totalStoriesAssigned)}
        </p>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center mt-16 mb-16">
      <BouncingDotsLoader />
    </div>
  );
}

ProjectTimelineStacked.propTypes = {
  color: PropTypes.string.isRequired
};

export default ProjectTimelineStacked;
