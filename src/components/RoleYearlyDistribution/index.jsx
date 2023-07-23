/* eslint-disable no-unused-vars */
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { ROLE_YEARLY_DISTRIBUTION } from '../../constants/apiEndpoints';
import makeRequest from '../../utils/makeRequest';

export default function RoleYearlyDistribution() {
  const [data, setData] = React.useState();
  const [containerDimensions, setContainerDimensions] = React.useState({ width: 0, height: 0 });

  async function getData() {
    const returnedData = await makeRequest(
      ROLE_YEARLY_DISTRIBUTION,
      {},
      { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
    );
    setData(returnedData);
  }

  function getOptions(arr) {
    const display = arr.map((item) => ({ name: item.role, y: Number(item.countRoles) }));
    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'bottom',
        itemMarginTop: 0,
        itemMarginBottom: 0
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.1f}%)</b>'
      },
      plotOptions: {
        pie: {
          borderRadius: 10,
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          },
          showInLegend: true
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Role Played Across Projects',
        enabled: true,
        align: 'left',
        verticalAlign: 'top',
        floating: true,
        y: 17,
        style: { fontSize: '15px', fontWeight: 'bold' }
      },
      series: [{
        name: 'Role Count',
        colorByPoint: true,
        data: display
      }]
    };
  }

  React.useEffect(() => {
    getData();
    const updateDimensions = () => {
      setContainerDimensions({
        width: (90 / 100) * (document.getElementById('container').clientWidth),
        height: document.getElementById('container').clientHeight
      });
    };
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div id="container" className="bg-white rounded-2xl h-full w-full flex justify-center">
      {/* <div className="h-full w-1/5 pl-2 pb-2 bg-white text-sm flex
      items-end rounded-2xl text-dark_gray">Role Played Accross Projects</div> */}
      {
        (!data) ? <p>Role Yearly Distribution</p>
          : (
            <HighchartsReact
              highcharts={Highcharts}
              options={getOptions(data)}
              containerProps={{
                style: {
                  height: '100%', width: '100%', borderRadius: '15px'
                }
              }}
            />
          )
      }
    </div>
  );
}
