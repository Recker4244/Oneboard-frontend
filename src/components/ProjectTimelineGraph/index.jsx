/* eslint-disable react/no-this-in-sfc */
import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
// import CircularProgress from '@mui/material/CircularProgress';
import HighchartsReact from 'highcharts-react-official';
import { useParams } from 'react-router';
import makeRequest from '../../utils/makeRequest';
import BouncingDotsLoader from '../BouncingDotsLoader';
import { GET_STORY_POINTS_BY_SPRINTS } from '../../constants/apiEndpoints';

function ProjectTimelineGraph() {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const { id } = useParams();

  const options = {
    title: {
      text: ''
    },
    xAxis: {
      title: {
        text: 'Sprints',
        style: {
          fontWeight: 'bold',
          fontSize: '16px',
          color: 'black'
        }
      },
      type: 'datetime',
      labels: {
        format: '{value:%Y-%b-%e}'
      },
      tickPositions: data.map((item) => {
        const date = new Date(item.startDate);
        console.log(date.getTime());
        return date.getTime();
      }),
      lineColor: 'black',
      lineWidth: 3,
      tickWidth: 2,
      tickColor: 'black',
      tickmarkPlacement: 'on'
    },
    yAxis: {
      title: {
        text: 'Story Points',
        style: {
          fontWeight: 'bold',
          fontSize: '16px',
          color: 'black'
        }
      },
      tickPositions: [10, 20, 30, 40, 50],
      lineColor: 'black',
      lineWidth: 3,
      tickWidth: 2,
      tickColor: 'black',
      tickmarkPlacement: 'on',
      gridLineColor: 'transparent'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
          format: '{point.y} SP'
        },
        enableMouseTracking: true
      },
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: new Date(data[0]?.startDate).getTime()
      }
    },
    tooltip: {
      formatter() {
        return `Sprint: ${this.point.index + 1} (${this.point.y})`;
      }
    },
    series: [{
      showInLegend: false,
      name: 'Story Points',
      label: {
        enabled: true,
        format: '{point.y}'
      },
      data: data.map((item, index) => {
        const date = new Date(item.startDate);
        return [date.getTime(), item.storyPoints, index + 1];
      })
    }]
  };

  // if (data.length === 0) {
  //   return (
  //     <div className="flex justify-center items-center mt-24">
  //       <BouncingDotsLoader />
  //     </div>

  //   );
  // }
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    makeRequest(GET_STORY_POINTS_BY_SPRINTS(id), {}, { headers: { 'x-auth-token': token } }).then((response) => {
      setData(response);
      setLoading(false);
    });
    setLoading(false);
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center mt-24">
        <BouncingDotsLoader />
      </div>
    );
  }

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
}

export default ProjectTimelineGraph;

// import React from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import HighchartsColumnRange from 'highcharts/modules/columnrange';

// HighchartsColumnRange(Highcharts);

// function ProjectTimelineGraph() {
//   const chartOptions = {
//     chart: {
//       type: 'columnrange',
//       inverted: true
//     },
//     title: {
//       text: 'Project Timeline'
//     },
//     xAxis: {
//       type: 'datetime',
//       tickInterval: 15 * 24 * 3600 * 1000, // 15-day interval
//       labels: {
//         format: '{value:%d %b %Y}' // Date format
//       }
//     },
//     yAxis: {
//       title: {
//         text: 'Sprint Number'
//       }
//     },
//     legend: {
//       enabled: false
//     },
//     tooltip: {
//       enabled: false
//     },
//     plotOptions: {
//       columnrange: {
//         dataLabels: {
//           enabled: true,
//           inside: true,
//           align: 'center',
//           formatter() {
//             return this.y;
//           }
//         }
//       }
//     },
//     series: [{
//       name: 'Sprint Points',
//       data: [
//         [Date.UTC(2023, 0, 1), 1, 5],
//         [Date.UTC(2023, 0, 16), 2, 8],
//         [Date.UTC(2023, 1, 1), 3, 4],
//         [Date.UTC(2023, 1, 16), 4, 9],
//         [Date.UTC(2023, 2, 3), 5, 6]
//       ]
//     }]
//   };

//   return (
//     <HighchartsReact highcharts={Highcharts} options={chartOptions} />
//   );
// }

// export default ProjectTimelineGraph;
