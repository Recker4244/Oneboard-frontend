import { React, useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import { useParams } from 'react-router-dom';
import HighchartsReact from 'highcharts-react-official';
import BouncingDotsLoader from '../BouncingDotsLoader';
import makeRequest from '../../utils/makeRequest';
import { GET_EFFORT_DISTRIBUTION } from '../../constants/apiEndpoints';

function EffortDistribution() {
  const token = localStorage.getItem('accessToken');
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    makeRequest(GET_EFFORT_DISTRIBUTION(id), {}, { headers: { 'x-auth-token': token } }).then((res) => {
      setData(res);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const options = {
    chart: {
      type: 'column'
    },
    // colors: ['#8FD04F', '#F24627', '#FAC711'],
    colors: ['#00A9F4', '#99E6FF', '#2251FF', '#14B8AB', '#0679C3', '#FFFFF', '#9C217D', '#F17E7E', '#108980', '#E479E4'],
    title: {
      text: null
    },
    xAxis: {
      categories: data.sprints
    },
    yAxis: {
      min: 0,
      title: {
        text: null
      }
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
      shared: true
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 0,
      y: 100
    },
    plotOptions: {
      column: {
        stacking: 'percent'
      }
    },
    credits: {
      enabled: false
    },
    series: data.countOfIssuesInEpics
  };
  return (
    <>
      {loading && (
        <div className="flex justify-center items-center mt-24" data-testid="bouncing-dots-loader">
          <BouncingDotsLoader />
        </div>
      )}
      {!loading && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </>
  );
}

export default EffortDistribution;
